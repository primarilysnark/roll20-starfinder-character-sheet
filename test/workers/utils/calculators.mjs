import should from 'should'

describe('Formatters', function () {
  let subject

  beforeEach(function (done) {
    import('../../../src/workers/utils/calculators.mjs').then((result) => {
      subject = result

      done()
    })
  })

  describe('#sum', function () {
    it('should sum a collection of dependencies', function () {
      const result = subject.sum(
        {
          fieldA: 3,
          fieldB: 4,
        },
        ['fieldA', 'fieldB']
      )

      should(result).equal(7)
    })

    it('should sum undefined dependencies', function () {
      const result = subject.sum(
        {
          fieldA: 3,
          fieldB: undefined,
        },
        ['fieldA', 'fieldB']
      )

      should(result).equal(3)
    })
  })

  describe('#sumWithBase', function () {
    it('should sum a collection of dependencies with a base value', function () {
      const result = subject.sumWithBase(5)(
        {
          fieldA: 3,
          fieldB: 4,
        },
        ['fieldA', 'fieldB']
      )

      should(result).equal(12)
    })

    it('should sum undefined dependencies', function () {
      const result = subject.sumWithBase(4)(
        {
          fieldA: 3,
          fieldB: undefined,
        },
        ['fieldA', 'fieldB']
      )

      should(result).equal(7)
    })
  })

  describe('#sumDamage', function () {
    it('should sum damage dependencies', function () {
      const result = subject.sumDamage({ matchKind: true })(
        {
          fieldA: [
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
          ],
          fieldB: [
            {
              operation: 'addition',
              count: 1,
              size: 6,
              type: 'dice',
            },
            {
              operation: 'addition',
              count: 2,
              type: 'modifier',
            },
          ],
        },
        ['fieldA', 'fieldB']
      )

      should(result).deepEqual([
        {
          operation: 'addition',
          count: 2,
          size: 6,
          type: 'dice',
        },
        {
          operation: 'addition',
          count: 6,
          type: 'modifier',
        },
      ])
    })

    it('should sum non-matching damage dependencies', function () {
      const result = subject.sumDamage({ matchKind: true })(
        {
          fieldA: [
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
          ],
          fieldB: [
            {
              operation: 'addition',
              count: 1,
              size: 8,
              type: 'dice',
            },
            {
              operation: 'addition',
              count: 2,
              type: 'modifier',
            },
          ],
        },
        ['fieldA', 'fieldB']
      )

      should(result).deepEqual([
        {
          operation: 'addition',
          count: 1,
          size: 6,
          type: 'dice',
        },
        {
          operation: 'addition',
          count: 1,
          size: 8,
          type: 'dice',
        },
        {
          operation: 'addition',
          count: 6,
          type: 'modifier',
        },
      ])
    })

    it('should sum non-matching damage dependencies', function () {
      const result = subject.sumDamage({ matchKind: true })(
        {
          fieldA: [
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
            {
              operation: 'addition',
              count: 3,
              kind: 'INSIGHT',
              type: 'modifier',
            },
          ],
          fieldB: [
            {
              operation: 'addition',
              count: 1,
              size: 6,
              type: 'dice',
            },
            {
              operation: 'addition',
              count: 2,
              type: 'modifier',
            },
            {
              operation: 'addition',
              count: 7,
              kind: 'INSIGHT',
              type: 'modifier',
            },
          ],
        },
        ['fieldA', 'fieldB']
      )

      should(result).deepEqual([
        {
          operation: 'addition',
          count: 2,
          size: 6,
          type: 'dice',
        },
        {
          operation: 'addition',
          count: 5,
          type: 'modifier',
        },
        {
          operation: 'addition',
          count: 7,
          kind: 'INSIGHT',
          type: 'modifier',
        },
      ])
    })
  })
})
