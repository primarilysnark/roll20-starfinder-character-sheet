import * as formatters from './utils/formatter.mjs'
import * as roll20 from './utils/roll20.mjs'
import { parseAttributeName, validateAttribute } from './utils/attributes.mjs'

export class ChangeNotifier {
  constructor() {
    this.attributes = {}
    this.repeatingAttributes = {}
  }

  _getDependencyAttributesByAttribute(source) {
    return Object.values(this.attributes).filter((attribute) =>
      attribute.dependencies.includes(source)
    )
  }

  register(name, { calculate, dependencies = [], format, parse } = {}) {
    validateAttribute({
      name,
      calculate,
      dependencies,
      format,
      parse,
    })

    dependencies.forEach((dependency) => {
      if (this.attributes[dependency] === undefined) {
        throw new Error(
          `Dependency "${dependency}" must be registered before it can be relied on.`
        )
      }
    })

    this.attributes[name] = {
      name,
      calculate,
      dependencies,
      format,
      parse,
    }

    return this
  }

  repeating(name, properties) {
    Object.keys(properties).forEach((property) => {
      this.register(`${name}:${property}`, properties[property])
    })

    this.repeatingAttributes[name] = Object.keys(properties)

    return this
  }

  start() {
    const attributes = Object.keys(this.attributes)

    attributes.forEach((attribute) => {
      roll20.addEventListener(`change:${attribute}`, (event) => {
        const eventAttribute = parseAttributeName(event.sourceAttribute)

        console.log('Change Event:', event.sourceAttribute, eventAttribute)

        if (this.attributes[eventAttribute.attribute].parse) {
          try {
            this.attributes[eventAttribute.attribute].parse(event.newValue)
          } catch (err) {
            return roll20.setAttributes(
              {
                [event.sourceAttribute]: event.previousValue,
                error_message: err.message,
                show_error: formatters.formatBoolean(true),
              },
              {
                silent: true,
              }
            )
          }
        }

        const dependencyAttributes = this._getDependencyAttributesByAttribute(
          eventAttribute.attribute
        )

        if (dependencyAttributes.length === 0) {
          return
        }

        const uniqueDependencies = new Set(
          dependencyAttributes
            .map((dependencyAttribute) => dependencyAttribute.dependencies)
            .reduce((acc, val) => acc.concat(val))
        )

        roll20.getAttributes([...uniqueDependencies], (values) => {
          console.log(values)

          Object.keys(values).forEach((key) => {
            if (this.attributes[key].parse) {
              values[key] = this.attributes[key].parse(values[key])
            }
          })

          const result = dependencyAttributes
            .map((dependencyAttribute) => {
              let updatedValue = dependencyAttribute.calculate(values)

              if (dependencyAttribute.format) {
                updatedValue = dependencyAttribute.format(updatedValue)
              }

              return {
                name: dependencyAttribute.name,
                updatedValue,
              }
            })
            .reduce(
              (attributeSet, dependencyAttribute) => ({
                ...attributeSet,
                [dependencyAttribute.name]: dependencyAttribute.updatedValue,
              }),
              {}
            )

          console.log('Updating Fields:', result)

          roll20.setAttributes(result)
        })
      })
    })

    return this
  }
}
