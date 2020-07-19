import * as td from 'testdouble'
import should from 'should'

describe('ChangeNotifier', function () {
  let subject

  beforeEach(function (done) {
    td.replaceEsm('../../src/workers/utils/formatter.mjs')

    import('../../src/workers/change-notifier.mjs').then((result) => {
      subject = result

      done()
    })
  })

  afterEach(function () {
    td.reset()
  })

  describe('#parseAttributeName', function () {
    it('should parse non-repeating attribute names', function () {
      const result = subject.parseAttributeName('initiative_bonus')

      should(result).eql({
        attribute: 'initiative_bonus',
      })
    })

    it('should parse repeating attribute names', function () {
      const result = subject.parseAttributeName(
        'repeating_classes_-mcufchhyvsryjrp9vtx_bab'
      )

      should(result).eql({
        attribute: 'repeating_classes:bab',
        repeating: {
          kind: 'repeating_classes',
          sectionId: '-mcufchhyvsryjrp9vtx',
          attribute: 'bab',
        },
      })
    })

    it('should throw when it parses an invalid repeating attribute name', function () {
      should.throws(
        () =>
          subject.parseAttributeName(
            'repeating_classes_-mcufchhyvsryjrp9vtx_bab-thing'
          ),
        /Given repeating attribute name is invalid./
      )
    })
  })
})
