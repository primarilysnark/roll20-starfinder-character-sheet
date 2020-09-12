import should from 'should'

describe('Formatters', function () {
  let subject

  beforeEach(function (done) {
    import('../../../src/workers/utils/formatter.mjs').then((result) => {
      subject = result

      done()
    })
  })

  describe('Booleans', function () {
    describe('#parse', function () {
      it('should parse "1" to true', function () {
        const result = subject.boolean.parse('1')

        should(result).equal(true)
      })

      it('should parse "0" to false', function () {
        const result = subject.boolean.parse('0')

        should(result).equal(false)
      })

      it('should parse empty to null', function () {
        const result = subject.boolean.parse('')

        should(result).equal(null)
      })

      it('should parse null to null', function () {
        const result = subject.boolean.parse(null)

        should(result).equal(null)
      })
    })

    describe('#format', function () {
      it('should format true to "1"', function () {
        const result = subject.boolean.format(true)

        should(result).equal('1')
      })

      it('should format false to "0"', function () {
        const result = subject.boolean.format(false)

        should(result).equal('0')
      })

      it('should format null to ""', function () {
        const result = subject.boolean.format(null)

        should(result).equal('')
      })
    })
  })

  describe('Integers', function () {
    describe('#parse', function () {
      it('should parse null to null', function () {
        const result = subject.integer.parse(null)

        should(result).equal(null)
      })

      it('should parse empty to null', function () {
        const result = subject.integer.parse('')

        should(result).equal(null)
      })

      it('should parse a provided integer', function () {
        const result = subject.integer.parse('123')

        should(result).equal(123)
      })

      it('should parse a number for a number', function () {
        const result = subject.integer.parse(456)

        should(result).equal(456)
      })

      it('should parse a rounded integer for a double', function () {
        const result = subject.integer.parse('456.2')

        should(result).equal(456)
      })

      it('should throw for an invalid integer', function () {
        should.throws(
          () => subject.integer.parse('asdf'),
          /Provided value must be an integer number./
        )
      })
    })

    describe('#format', function () {
      it('should format integer to string', function () {
        const result = subject.integer.format(123)

        should(result).equal('123')
      })
    })
  })

  describe('Modifiers', function () {
    describe('#parse', function () {
      it('should parse null to null', function () {
        const result = subject.modifier.parse(null)

        should(result).equal(null)
      })

      it('should parse empty to null', function () {
        const result = subject.modifier.parse('')

        should(result).equal(null)
      })

      it('should parse number to number', function () {
        const result = subject.modifier.parse(3)

        should(result).equal(3)
      })

      it('should parse positive modifier to number', function () {
        const result = subject.modifier.parse('+4')

        should(result).equal(4)
      })

      it('should parse negative modifier to number', function () {
        const result = subject.modifier.parse('–2')

        should(result).equal(-2)
      })

      it('should parse zero modifier to number', function () {
        const result = subject.modifier.parse('0')

        should(result).equal(0)
      })
    })

    describe('#format', function () {
      it('should format positive number to positive modifier', function () {
        const result = subject.modifier.format(4)

        should(result).equal('+4')
      })

      it('should format negative number to negative modifier', function () {
        const result = subject.modifier.format(-3)

        should(result).equal('–3')
      })

      it('should format zero number to zero modifier', function () {
        const result = subject.modifier.format(0)

        should(result).equal('0')
      })
    })
  })

  describe('Damage', function () {
    describe('#parse', function () {
      it('should parse standard dice notation', function () {
        const result = subject.damage.parse('1d6')

        should(result).deepEqual([
          {
            operation: 'addition',
            count: 1,
            size: 6,
            type: 'dice',
          },
        ])
      })

      it('should parse multiple dice', function () {
        const result = subject.damage.parse('1d6 + 2d8')

        should(result).deepEqual([
          {
            operation: 'addition',
            count: 1,
            size: 6,
            type: 'dice',
          },
          {
            operation: 'addition',
            count: 2,
            size: 8,
            type: 'dice',
          },
        ])
      })

      it('should parse typed dice', function () {
        const result = subject.damage.parse('1d6 + 2d8[INSIGHT]')

        should(result).deepEqual([
          {
            operation: 'addition',
            count: 1,
            size: 6,
            type: 'dice',
          },
          {
            operation: 'addition',
            kind: 'INSIGHT',
            count: 2,
            size: 8,
            type: 'dice',
          },
        ])
      })

      it('should parse ignoring spaces', function () {
        const result = subject.damage.parse('1d6+  2d8')

        should(result).deepEqual([
          {
            operation: 'addition',
            count: 1,
            size: 6,
            type: 'dice',
          },
          {
            operation: 'addition',
            count: 2,
            size: 8,
            type: 'dice',
          },
        ])
      })

      it('should parse untyped modifiers', function () {
        const result = subject.damage.parse('1d6 + 3')

        should(result).deepEqual([
          {
            operation: 'addition',
            count: 1,
            size: 6,
            type: 'dice',
          },
          {
            operation: 'addition',
            count: 3,
            type: 'modifier',
          },
        ])
      })

      it('should parse typed modifiers', function () {
        const result = subject.damage.parse('1d6 + 4[INSIGHT]')

        should(result).deepEqual([
          {
            operation: 'addition',
            count: 1,
            size: 6,
            type: 'dice',
          },
          {
            operation: 'addition',
            kind: 'INSIGHT',
            count: 4,
            type: 'modifier',
          },
        ])
      })

      it('should parse negative operations', function () {
        const result = subject.damage.parse('1d6 - 4')

        should(result).deepEqual([
          {
            operation: 'addition',
            count: 1,
            size: 6,
            type: 'dice',
          },
          {
            operation: 'subtraction',
            count: 4,
            type: 'modifier',
          },
        ])
      })
    })

    describe('#format', function () {
      it('should format standard dice notation', function () {
        const result = subject.damage.format([
          {
            operation: 'addition',
            count: 1,
            size: 6,
            type: 'dice',
          },
          {
            operation: 'addition',
            count: 4,
            type: 'modifier',
          },
        ])

        should(result).equal('1d6 + 4')
      })

      it('should format negative dice notation', function () {
        const result = subject.damage.format([
          {
            operation: 'addition',
            count: 1,
            size: 6,
            type: 'dice',
          },
          {
            operation: 'subtraction',
            count: 4,
            type: 'modifier',
          },
        ])

        should(result).equal('1d6 - 4')
      })

      it('should format typed dice notation', function () {
        const result = subject.damage.format([
          {
            operation: 'addition',
            count: 1,
            size: 6,
            kind: 'WEAPON',
            type: 'dice',
          },
          {
            operation: 'addition',
            count: 4,
            kind: 'INSIGHT',
            type: 'modifier',
          },
        ])

        should(result).equal('1d6[WEAPON] + 4[INSIGHT]')
      })
    })
  })
})
