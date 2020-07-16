export class ChangeNotifier {
  constructor() {
    this.attributes = {};
  }

  _getDependencyAttributesByAttribute(source) {
    return Object.values(this.attributes)
      .filter((attribute) => attribute.dependencies.includes(source));
  }

  register(name, { calculate, dependencies = [], format, parse } = {}) {
    dependencies.forEach((dependency) => {
      if (this.attributes[dependency] === undefined) {
        throw new Error(`Dependency "${dependency}" must be registered before it can be relied on.`);
      }
    });

    this.attributes[name] = {
      name,
      calculate,
      dependencies,
      format,
      parse,
    };

    return this;
  }

  listen() {
    const attributes = Object.keys(this.attributes);

    attributes.forEach((attribute) => {
      on(`change:${attribute}`, (event) => {
        console.log('Change Event:', event.sourceAttribute);

        const dependencyAttributes = this._getDependencyAttributesByAttribute(event.sourceAttribute);

        if (dependencyAttributes.length === 0) {
          return;
        }

        const uniqueDependencies = new Set(
          dependencyAttributes
            .map((dependencyAttribute) => dependencyAttribute.dependencies)
            .reduce((acc, val) => acc.concat(val))
        );

        getAttrs([...uniqueDependencies], (values) => {
          console.log(values);

          Object.keys(values).forEach((key) => {
            if (this.attributes[key].parse) {
              values[key] = this.attributes[key].parse(values[key]);
            }
          });

          const result = dependencyAttributes
            .map((dependencyAttribute) => {
              let updatedValue = dependencyAttribute.calculate(values);

              if (dependencyAttribute.format) {
                updatedValue = dependencyAttribute.format(updatedValue);
              }

              return {
                name: dependencyAttribute.name,
                updatedValue,
              };
            })
            .reduce((attributeSet, dependencyAttribute) => ({
              ...attributeSet,
              [dependencyAttribute.name]: dependencyAttribute.updatedValue,
            }), {});

          console.log('Updating Fields:', result);

          setAttrs(result);
        });
      });
    });

    return this;
  }
}
