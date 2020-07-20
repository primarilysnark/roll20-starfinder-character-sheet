import * as roll20 from './utils/roll20.mjs'
import { Navigator } from './navigator.mjs'
import { parseAttributeName, validateAttribute } from './utils/attributes.mjs'

export class ChangeNotifier {
  constructor({ shouldLog = true } = {}) {
    this.listeners = new Map()
    this.shouldLog = shouldLog

    this._handleChangeEvent = this._handleChangeEvent.bind(this)
    this._log = this._log.bind(this)

    this._log('[create event] Created change notifier')
  }

  _getAttributesDependingOnAttribute(attribute) {
    return [...this.listeners.values()].filter((possibleDependency) =>
      possibleDependency.dependencies.includes(attribute.name)
    )
  }

  _handleChangeEvent(event, callback) {
    this._log('[change event] Updated', event.sourceAttribute)

    const attributeNameProperties = parseAttributeName(event.sourceAttribute)
    const attribute = this.getListener(attributeNameProperties.attribute)

    /* Validate new attribute value */
    if (attribute.parse) {
      const { success, message } = this._tryParseAttribute(
        attribute,
        event.newValue
      )

      if (!success) {
        this._revertChangeEvent(event)
        Navigator.showError(message)

        if (callback && typeof callback === 'function') {
          callback()
        }

        return
      }
    }

    /* Check if updated attribute has any dependencies */
    const attributesToUpdate = this._getAttributesDependingOnAttribute(
      attribute
    )

    if (attributesToUpdate.length === 0) {
      this._log('[change event] No dependencies for', event.sourceAttribute)

      if (callback && typeof callback === 'function') {
        callback()
      }

      return
    }

    /* Get current values of all dependencies for attributes to update */
    const dependenciesOfAttributesToUpdate = new Set(
      attributesToUpdate
        .map((dependencyAttribute) => dependencyAttribute.dependencies)
        .reduce((acc, val) => acc.concat(val), [])
    )

    roll20.getAttributes(
      [...dependenciesOfAttributesToUpdate],
      (attributeValues) => {
        const currentDependencyValues = this._parseAttributeMap(attributeValues)

        const updatedAttributes = attributesToUpdate
          .map((attributeToUpdate) => {
            let updatedValue = attributeToUpdate.calculate(
              currentDependencyValues
            )

            if (attributeToUpdate.format) {
              updatedValue = attributeToUpdate.format(updatedValue)
            }

            return [attributeToUpdate.name, updatedValue]
          })
          .reduce(
            (updatedAttributeMap, [key, value]) => ({
              ...updatedAttributeMap,
              [key]: value,
            }),
            {}
          )

        roll20.setAttributes(updatedAttributes)

        if (callback && typeof callback === 'function') {
          callback()
        }
      }
    )
  }

  _log(...messages) {
    if (this.shouldLog) {
      console.log(...messages)
    }
  }

  _parseAttributeMap(attributeMap) {
    return Object.keys(attributeMap)
      .map((attributeName) => {
        if (this.hasListener(attributeName)) {
          const attribute = this.getListener(attributeName)

          if (attribute.parse) {
            return [attributeName, attribute.parse(attributeMap[attributeName])]
          }
        }

        return [attributeName, attributeMap[attributeName]]
      })
      .reduce(
        (map, [key, value]) => ({
          ...map,
          [key]: value,
        }),
        {}
      )
  }

  _revertChangeEvent(event) {
    this._log('[change event] Reverted', event.sourceAttribute)

    roll20.setAttributes(
      {
        [event.sourceAttribute]: event.previousValue,
      },
      {
        silent: true,
      }
    )
  }

  _tryParseAttribute(attribute, value) {
    try {
      return {
        success: true,
        value: attribute.parse(value),
      }
    } catch (err) {
      return {
        success: false,
        message: err.message,
      }
    }
  }

  _validate(attribute) {
    validateAttribute(attribute)

    attribute.dependencies.forEach((dependencyName) => {
      if (!this.hasListener(dependencyName)) {
        throw new Error(
          `Dependency "${dependencyName}" must be added before it can be depended on.`
        )
      }
    })

    return attribute
  }

  addListener(name, attributes) {
    const attribute = this._validate({
      dependencies: [],
      name: name,
      ...attributes,
    })
    this.listeners.set(attribute.name, attribute)
  }

  hasListener(attributeName) {
    return this.listeners.has(attributeName)
  }

  getListener(attributeName) {
    return this.listeners.get(attributeName)
  }

  start() {
    // Register all attribute handlers
    this.listeners.forEach((_, attributeName) => {
      roll20.addEventListener(`change:${attributeName}`, (event) =>
        this._handleChangeEvent(event)
      )
    })
  }
}
