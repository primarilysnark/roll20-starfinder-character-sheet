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
      it('should parse "on" to true', function () {
        const result = subject.parseBoolean('on')

        should(result).equal(true)
      })

      it('should parse "off" to false', function () {
        const result = subject.parseBoolean('off')

        should(result).equal(false)
      })

      it('should parse empty to null', function () {
        const result = subject.parseBoolean('')

        should(result).equal(null)
      })

      it('should parse null to null', function () {
        const result = subject.parseBoolean(null)

        should(result).equal(null)
      })
    })

    describe('#format', function () {
      it('should format true to "on"', function () {
        const result = subject.formatBoolean(true)

        should(result).equal('on')
      })

      it('should format false to "off"', function () {
        const result = subject.formatBoolean(false)

        should(result).equal('off')
      })

      it('should format null to ""', function () {
        const result = subject.formatBoolean(null)

        should(result).equal('')
      })
    })
  })

  describe('Integers', function () {
    describe('#parse', function () {
      it('should parse null to null', function () {
        const result = subject.parseInteger(null)

        should(result).equal(null)
      })

      it('should parse empty to null', function () {
        const result = subject.parseInteger('')

        should(result).equal(null)
      })

      it('should parse a provided integer', function () {
        const result = subject.parseInteger('123')

        should(result).equal(123)
      })

      it('should parse a number for a number', function () {
        const result = subject.parseInteger(456)

        should(result).equal(456)
      })

      it('should parse a rounded integer for a double', function () {
        const result = subject.parseInteger('456.2')

        should(result).equal(456)
      })

      it('should throw for an invalid integer', function () {
        should.throws(
          () => subject.parseInteger('asdf'),
          'Provided value must be an integer number.'
        )
      })
    })

    describe('#format', function () {
      it('should format integer to string', function () {
        const result = subject.formatInteger(123)

        should(result).equal('123')
      })
    })
  })

  describe('Modifiers', function () {
    describe('#parse', function () {
      it('should parse null to null', function () {
        const result = subject.parseModifier(null)

        should(result).equal(null)
      })

      it('should parse empty to null', function () {
        const result = subject.parseModifier('')

        should(result).equal(null)
      })

      it('should parse number to number', function () {
        const result = subject.parseModifier(3)

        should(result).equal(3)
      })

      it('should parse positive modifier to number', function () {
        const result = subject.parseModifier('+4')

        should(result).equal(4)
      })

      it('should parse negative modifier to number', function () {
        const result = subject.parseModifier('–2')

        should(result).equal(-2)
      })

      it('should parse zero modifier to number', function () {
        const result = subject.parseModifier('0')

        should(result).equal(0)
      })
    })

    describe('#format', function () {
      it('should format positive number to positive modifier', function () {
        const result = subject.formatModifier(4)

        should(result).equal('+4')
      })

      it('should format negative number to negative modifier', function () {
        const result = subject.formatModifier(-3)

        should(result).equal('–3')
      })

      it('should format zero number to zero modifier', function () {
        const result = subject.formatModifier(0)

        should(result).equal('0')
      })
    })
  })
})
