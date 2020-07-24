import * as td from 'testdouble'
import should from 'should'

describe('attributes.mjs', function () {
  let subject

  beforeEach(function (done) {
    import('../../../src/workers/utils/attributes.mjs').then((result) => {
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
          sectionID: '-mcufchhyvsryjrp9vtx',
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

  describe('#validateAttribute', function () {
    it('should return true for a valid raw attribute', function () {
      const result = subject.validateAttribute({
        name: 'example_attribute',
        dependencies: [],
      })

      should(result).equal(true)
    })

    it('should throw an error for an invalid raw attribute', function () {
      should.throws(
        () =>
          subject.validateAttribute({
            dependencies: [],
          }),
        /Attribute must have a given name./
      )

      should.throws(
        () =>
          subject.validateAttribute({
            name: 'invalid_attribute',
          }),
        /Dependencies must be an array./
      )
    })

    it('should throw an error for attribute with only parse or format', function () {
      should.throws(
        () =>
          subject.validateAttribute({
            name: 'valid_name',
            dependencies: [],
            parse: () => {},
          }),
        /Attribute must have both format and parse or neither./
      )

      should.throws(
        () =>
          subject.validateAttribute({
            name: 'valid_name',
            dependencies: [],
            format: () => {},
          }),
        /Attribute must have both format and parse or neither./
      )
    })

    it('should throw an error for raw attribute with dependencies', function () {
      should.throws(
        () =>
          subject.validateAttribute({
            name: 'valid_name',
            dependencies: ['dependency'],
          }),
        /Raw attributes must not have dependencies./
      )
    })

    it('should throw an error for calculated attribute with no dependencies', function () {
      should.throws(
        () =>
          subject.validateAttribute({
            name: 'valid_name',
            dependencies: [],
            calculate: () => {},
          }),
        /Calculated attributes must have dependencies./
      )
    })
  })
})
