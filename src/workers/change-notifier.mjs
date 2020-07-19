import * as formatters from './utils/formatter.mjs'

const repeatingRegex = /([a-z0-9_]+)_(-[a-z0-9]*)_([a-z0-9_]+)/

export class ChangeNotifier {
  constructor() {
    this.attributes = {}
    this.repeatingAttributes = {}
  }

  _parseAttributeName(sourceAttribute) {
    if (sourceAttribute.startsWith('repeating')) {
      const [, repeating, id, subattribute] = sourceAttribute.match(
        repeatingRegex
      )

      return {
        repeating,
        id,
        subattribute,
        attribute: `${repeating}:${subattribute}`,
      }
    }

    return {
      attribute: sourceAttribute,
    }
  }

  _getDependencyAttributesByAttribute(source) {
    return Object.values(this.attributes).filter((attribute) =>
      attribute.dependencies.includes(source)
    )
  }

  register(name, { calculate, dependencies = [], format, parse } = {}) {
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
      on(`change:${attribute}`, (event) => {
        const eventAttribute = this._parseAttributeName(event.sourceAttribute)

        console.log('Change Event:', event.sourceAttribute, eventAttribute)

        if (this.attributes[eventAttribute.attribute].parse) {
          try {
            this.attributes[eventAttribute.attribute].parse(event.newValue)
          } catch (err) {
            return setAttrs(
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

        getAttrs([...uniqueDependencies], (values) => {
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

          setAttrs(result)
        })
      })
    })

    return this
  }
}
