import * as roll20 from './utils/roll20.mjs'
import { parseAttributeName, validateAttribute } from './utils/attributes.mjs'

import { Navigator } from './navigator.mjs'

export class ChangeNotifier {
  constructor({ shouldLog = true } = {}) {
    this.listeners = new Map()
    this.nestedListeners = new Map()
    this.shouldLog = shouldLog

    this._handleChangeEvent = this._handleChangeEvent.bind(this)
    this._handleRemoveEvent = this._handleRemoveEvent.bind(this)
    this._log = this._log.bind(this)

    this._log('[create event] Created change notifier')
  }

  _getAttributesDependingOnAttribute(attribute) {
    return [...this.listeners.values()].filter((possibleDependency) =>
      possibleDependency.dependencies
        .map((dependency) => dependency.replace(':$:', ':'))
        .includes(attribute.name)
    )
  }

  _handleChangeEvent(event, callback) {
    this._log('[change event] Updated', event.sourceAttribute)

    const attributeNameProperties = parseAttributeName(event.sourceAttribute)
    let attribute = this.getListener(attributeNameProperties.attribute)

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
        .map((dependency) => {
          if (attributeNameProperties.repeating) {
            return dependency.replace(
              ':$:',
              `:${attributeNameProperties.repeating.sectionID}:`
            )
          }

          return dependency
        })
    )

    roll20.getAttributes(
      [...dependenciesOfAttributesToUpdate],
      (attributeValues) => {
        const currentDependencyValues = this._parseAttributeMap(attributeValues)

        const updatedAttributes = attributesToUpdate
          .map((attributeToUpdate) => {
            this._log('[change event] Calculating', attributeToUpdate.name)

            if (
              attributeToUpdate.repeating &&
              attributeNameProperties.repeating != null
            ) {
              let updatedValue = attributeToUpdate.calculate(
                currentDependencyValues,
                attributeToUpdate.dependencies,
                attributeNameProperties.repeating.sectionID
              )

              if (attributeToUpdate.format) {
                updatedValue = attributeToUpdate.format(updatedValue)
              }

              return {
                key: attributeToUpdate.name.replace(
                  ':',
                  `_${attributeNameProperties.repeating.sectionID}_`
                ),
                value: updatedValue,
              }
            } else if (attributeToUpdate.repeating) {
              const [repeatingSection] = attributeToUpdate.name.split(':')

              const repeatingSectionIds = Object.keys(
                currentDependencyValues[repeatingSection]
              )

              return repeatingSectionIds.map((sectionID) => {
                let updatedValue = attributeToUpdate.calculate(
                  currentDependencyValues,
                  attributeToUpdate.dependencies,
                  sectionID
                )

                if (attributeToUpdate.format) {
                  updatedValue = attributeToUpdate.format(updatedValue)
                }

                return {
                  key: attributeToUpdate.name.replace(':', `_${sectionID}_`),
                  value: updatedValue,
                }
              })
            } else {
              let updatedValue = attributeToUpdate.calculate(
                currentDependencyValues,
                attributeToUpdate.dependencies,
                undefined
              )

              if (attributeToUpdate.format) {
                updatedValue = attributeToUpdate.format(updatedValue)
              }

              return {
                key: attributeToUpdate.name,
                value: updatedValue,
              }
            }
          })
          .flat()
          .reduce(
            (updatedAttributeMap, { key, value }) => ({
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

  _handleRemoveEvent(event) {
    this._log('[change event] Removed', event.sourceAttribute)

    const attributeNameProperties = parseAttributeName(event.sourceAttribute)
    if (!this.nestedListeners.has(attributeNameProperties.repeating.kind)) {
      this._log(
        '[change event] No repeating class registered for',
        attributeNameProperties.repeating.kind
      )

      return
    }

    this.nestedListeners
      .get(attributeNameProperties.repeating.kind)
      .map(
        (nestedAttribute) =>
          `${attributeNameProperties.repeating.kind}_${attributeNameProperties.repeating.sectionID}_${nestedAttribute}`
      )
      .forEach((nestedAttributeName) => {
        this._handleChangeEvent({
          newValue: '',
          sourceAttribute: nestedAttributeName,
        })
      })
  }

  _log(...messages) {
    if (this.shouldLog) {
      console.log(...messages)
    }
  }

  _parseAttributeMap(attributeMap, repeatingAttributeName = '') {
    return Object.keys(attributeMap)
      .map((attributeKey) => {
        const value = attributeMap[attributeKey]
        const name =
          repeatingAttributeName !== ''
            ? `${repeatingAttributeName}:${attributeKey}`
            : attributeKey

        if (this.hasListener(name)) {
          const attribute = this.getListener(name)

          if (attribute.parse) {
            if (Array.isArray(value)) {
              return [
                attributeKey,
                value.map((entry) => {
                  const parsedValue = attribute.parse(entry)

                  if (parsedValue === null) {
                    return attribute.defaultValue
                  }

                  return parsedValue
                }),
              ]
            }

            const parsedValue = attribute.parse(value)

            if (parsedValue === null) {
              return [attributeKey, attribute.defaultValue]
            }

            return [attributeKey, parsedValue]
          }
        }

        if (typeof value === 'object') {
          return [
            attributeKey,
            this._parseAttributeMap(
              value,
              repeatingAttributeName !== '' ? repeatingAttributeName : name
            ),
          ]
        }

        return [attributeKey, attributeMap[name]]
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

  addNestedListener(name, nestedAttributes) {
    Object.keys(nestedAttributes).forEach((nestedAttributeKey) => {
      const nestedAttribute = nestedAttributes[nestedAttributeKey]
      const nestedAttributeName = `${name}:${nestedAttributeKey}`

      this.addListener(nestedAttributeName, {
        ...nestedAttribute,
        repeating: true,
        name: nestedAttributeName,
      })
    })

    this.nestedListeners.set(name, Object.keys(nestedAttributes))
  }

  hasListener(attributeName) {
    return this.listeners.has(attributeName)
  }

  hasNestedListener(attributeName) {
    return this.nestedListeners.has(attributeName)
  }

  getListener(attributeName) {
    return this.listeners.get(attributeName)
  }

  getNestedListener(attributeName) {
    return this.nestedListeners.get(attributeName)
  }

  start() {
    this.listeners.forEach((attribute) => {
      attribute.dependencies.forEach((dependencyName) => {
        if (!this.hasListener(dependencyName.replace(':$:', ':'))) {
          throw new Error(
            `Dependency "${dependencyName}" must be added before it can be depended on.`
          )
        }
      })
    })

    // Register all attribute handlers
    this.listeners.forEach((_, attributeName) => {
      roll20.addEventListener(`change:${attributeName}`, (event) =>
        this._handleChangeEvent(event)
      )
    })

    this.nestedListeners.forEach((_, attributeName) => {
      roll20.addEventListener(`remove:${attributeName}`, (event) => {
        this._handleRemoveEvent(event)
      })
    })

    roll20.addEventListener('sheet:opened', () => {
      this._log('[opened] Sheet opened')

      const autocalculatedAttributes = [...this.listeners.values()].filter(
        (attribute) => attribute.autocalculate
      )

      roll20.getAttributes(
        autocalculatedAttributes.map((attribute) => attribute.name),
        (values) => {
          const valuesToCalculate = Object.keys(values).filter(
            (attributeKey) =>
              values[attributeKey] == null || values[attributeKey].length === 0
          )

          this._log('[opened] Updating attributes', valuesToCalculate)

          roll20.setAttributes(
            valuesToCalculate.reduce(
              (operation, attribute) => ({
                ...operation,
                [attribute]: this.listeners.get(attribute).defaultValue,
              }),
              {}
            )
          )
        }
      )
    })
  }
}
