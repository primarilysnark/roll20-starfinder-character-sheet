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
})
