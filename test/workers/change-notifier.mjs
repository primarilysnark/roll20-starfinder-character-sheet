import * as td from 'testdouble'
import should from 'should'

describe('ChangeNotifier', function () {
  let subject
  let roll20Double

  beforeEach(async function () {
    roll20Double = await td.replaceEsm('../../src/workers/utils/roll20.mjs')

    await td.replaceEsm('../../src/workers/navigator.mjs')

    const changeNotifier = await import('../../src/workers/change-notifier.mjs')
    subject = new changeNotifier.ChangeNotifier({
      shouldLog: false,
    })
  })

  afterEach(function () {
    td.reset()
  })

  describe('#addListener', function () {
    it('should add an attribute listener with format and parse', function () {
      subject.addListener('attribute_name', {
        format: () => {},
        parse: () => {},
      })

      const listener = subject.getListener('attribute_name')
      should(listener.format).not.be.undefined()
      should(listener.parse).not.be.undefined()
    })

    it('should throw when adding an invalid attribute listener', function () {
      should.throws(
        () =>
          subject.addListener('attribute_name', {
            calculate: () => {},
            dependencies: [],
          }),
        /Calculated attributes must have dependencies./
      )
    })

    describe('Raw attributes', function () {
      it('should register a new raw attribute', function () {
        subject.addListener('attribute_name')

        should(subject.hasListener('attribute_name')).equal(true)
      })
    })

    describe('Calculated attributes', function () {
      beforeEach(function () {
        subject.addListener('dependable_attribute')
      })

      it('should register a new calculated attribute', function () {
        subject.addListener('attribute_name', {
          calculate: () => {},
          dependencies: ['dependable_attribute'],
        })
      })
    })
  })

  describe('#hasListener', function () {
    it('should return true if the attribute has a listener', function () {
      subject.addListener('sample_attribute')

      const result = subject.hasListener('sample_attribute')
      should(result).equal(true)
    })

    it('should return false if the attribute does not has a listener', function () {
      const result = subject.hasListener('missing_attribute')
      should(result).equal(false)
    })
  })

  describe('#start', function () {
    let baseAttribute
    let calculatedAttribute
    let noDependenciesAttribute
    let validatedAttribute

    beforeEach(function () {
      baseAttribute = {
        name: 'base_attribute',
      }

      calculatedAttribute = {
        name: 'calculated_attribute',
        calculate: td.func(),
        dependencies: ['base_attribute'],
      }

      noDependenciesAttribute = {
        name: 'no_dependencies_attribute',
      }

      validatedAttribute = {
        name: 'validated_attribute',
        format: td.func(),
        parse: td.func(),
      }

      subject.addListener(baseAttribute.name)
      subject.addListener(noDependenciesAttribute.name, noDependenciesAttribute)
      subject.addListener(validatedAttribute.name, validatedAttribute)
      subject.addListener(calculatedAttribute.name, calculatedAttribute)
    })

    describe('Repeating sections', function () {
      let repeatingSection
      let dependencyAttribute

      beforeEach(function () {
        repeatingSection = {
          nested_attribute: {
            format: td.func(),
            parse: td.func(),
          },
          dependent_nested_attribute: {
            format: td.func(),
            parse: td.func(),
            calculate: td.func(),
            dependencies: ['repeating_sections:$:nested_attribute'],
          },
        }

        dependencyAttribute = {
          name: 'dependency_attribute',
          calculate: td.func(),
          dependencies: ['repeating_sections:nested_attribute'],
        }

        subject.addNestedListener('repeating_sections', repeatingSection)
        subject.addListener(dependencyAttribute.name, dependencyAttribute)
      })

      it('should support dependencies on repeating sections', function () {
        td.when(
          repeatingSection.nested_attribute.parse('new value')
        ).thenReturn('new parsed value')

        td.when(
          roll20Double.getAttributes(['repeating_sections:nested_attribute'])
        ).thenCallback({
          'repeating_sections:nested_attribute': ['new value'],
          repeating_sections: {
            '-testid': {
              nested_attribute: 'new value',
            },
          },
        })

        td.when(
          dependencyAttribute.calculate(
            {
              'repeating_sections:nested_attribute': ['new parsed value'],
              repeating_sections: {
                '-testid': {
                  nested_attribute: 'new parsed value',
                },
              },
            },
            dependencyAttribute.dependencies,
            undefined
          )
        ).thenReturn('new dependency value')

        subject._handleChangeEvent(
          {
            sourceAttribute: 'repeating_sections_-testid_nested_attribute',
            newValue: 'new value',
            previousValue: 'previous value',
          },
          () => {
            td.verify(
              roll20Double.setAttributes({
                [dependencyAttribute.name]: 'new dependency value',
              })
            )
          }
        )
      })

      it('should support dependencies between repeating section fields', function () {
        td.when(
          repeatingSection.nested_attribute.parse('new value')
        ).thenReturn('new parsed value')

        td.when(
          roll20Double.getAttributes([
            'repeating_sections:-testid:nested_attribute',
            'repeating_sections:nested_attribute',
          ])
        ).thenCallback({
          'repeating_sections:nested_attribute': ['new value'],
          repeating_sections: {
            '-testid': {
              nested_attribute: 'new value',
            },
          },
        })

        td.when(
          dependencyAttribute.calculate(
            {
              'repeating_sections:nested_attribute': ['new parsed value'],
              repeating_sections: {
                '-testid': {
                  nested_attribute: 'new parsed value',
                },
              },
            },
            dependencyAttribute.dependencies,
            undefined
          )
        ).thenReturn('new dependency value')

        td.when(
          repeatingSection.dependent_nested_attribute.calculate(
            {
              'repeating_sections:nested_attribute': ['new parsed value'],
              repeating_sections: {
                '-testid': {
                  nested_attribute: 'new parsed value',
                },
              },
            },
            repeatingSection.dependent_nested_attribute.dependencies,
            '-testid'
          )
        ).thenReturn('new nested dependency value')

        td.when(
          repeatingSection.dependent_nested_attribute.format(
            'new nested dependency value'
          )
        ).thenReturn('new formatted nested dependency value')

        subject._handleChangeEvent(
          {
            sourceAttribute: 'repeating_sections_-testid_nested_attribute',
            newValue: 'new value',
            previousValue: 'previous value',
          },
          () => {
            td.verify(
              roll20Double.setAttributes({
                'repeating_sections_-testid_dependent_nested_attribute':
                  'new formatted nested dependency value',
                [dependencyAttribute.name]: 'new dependency value',
              })
            )
          }
        )
      })
    })

    it('should revert invalid messages', function () {
      td.when(validatedAttribute.parse('invalid_value')).thenThrow(
        new Error('Invalid value received')
      )

      subject._handleChangeEvent(
        {
          sourceAttribute: validatedAttribute.name,
          newValue: 'invalid_value',
          previousValue: 'valid_value',
        },
        () => {
          td.verify(
            roll20Double.setAttributes(
              {
                [validatedAttribute.name]: 'valid_value',
              },
              td.matchers.isA(Object)
            )
          )
        }
      )
    })

    it('should not update dependencies of event if no dependencies exist', function () {
      subject._handleChangeEvent(
        {
          sourceAttribute: noDependenciesAttribute.name,
          newValue: 'new value',
          previousValue: 'previous value',
        },
        () => should(td.explain(roll20Double.setAttributes).callCount).equal(0)
      )
    })

    it('should update dependencies of event', async function () {
      td.when(roll20Double.getAttributes([baseAttribute.name])).thenCallback({
        [baseAttribute.name]: 'new base value',
      })

      td.when(
        calculatedAttribute.calculate(
          {
            [baseAttribute.name]: 'new base value',
          },
          calculatedAttribute.dependencies,
          undefined
        )
      ).thenReturn('new calculated value')

      subject._handleChangeEvent(
        {
          sourceAttribute: baseAttribute.name,
          newValue: 'new base value',
          previousValue: 'previous base value',
        },
        () =>
          td.verify(
            roll20Double.setAttributes({
              [calculatedAttribute.name]: 'new calculated value',
            })
          )
      )
    })
  })
})
