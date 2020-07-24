import * as td from 'testdouble'
import should from 'should'

describe('Roll20', function () {
  let subject

  let getAttrs
  let getSectionIDs
  let setAttrs

  beforeEach(async function () {
    getAttrs = td.func()
    getSectionIDs = td.func()
    setAttrs = td.func()

    global.getAttrs = getAttrs
    global.getSectionIDs = getSectionIDs
    global.setAttrs = setAttrs

    subject = await import('../../../src/workers/utils/roll20.mjs')
  })

  describe('#getAttributes', function () {
    it('should fetch non-nested attributes', function () {
      td.when(getAttrs(['non_nested_attribute'])).thenCallback({
        non_nested_attribute: 'value',
      })

      subject.getAttributes(['non_nested_attribute'], (values) => {
        should(values).deepEqual({
          non_nested_attribute: 'value',
        })
      })
    })

    it('should fetch nested attributes', function () {
      td.when(getSectionIDs('section_one')).thenCallback([
        '-id1',
        '-id2',
        '-id3',
      ])
      td.when(getSectionIDs('section_two')).thenCallback([
        '-id4',
        '-id5',
        '-id6',
      ])

      td.when(
        getAttrs([
          'repeating_section_one_-id1_attribute_one',
          'repeating_section_one_-id1_attribute_two',
          'repeating_section_one_-id2_attribute_one',
          'repeating_section_one_-id2_attribute_two',
          'repeating_section_one_-id3_attribute_one',
          'repeating_section_one_-id3_attribute_two',
          'repeating_section_two_-id4_attribute_one',
          'repeating_section_two_-id5_attribute_one',
          'repeating_section_two_-id6_attribute_one',
        ])
      ).thenCallback({
        'repeating_section_one_-id1_attribute_one':
          'repeating_section_one_-id1_attribute_one_value',
        'repeating_section_one_-id1_attribute_two':
          'repeating_section_one_-id1_attribute_two_value',
        'repeating_section_one_-id2_attribute_one':
          'repeating_section_one_-id2_attribute_one_value',
        'repeating_section_one_-id2_attribute_two':
          'repeating_section_one_-id2_attribute_two_value',
        'repeating_section_one_-id3_attribute_one':
          'repeating_section_one_-id3_attribute_one_value',
        'repeating_section_one_-id3_attribute_two':
          'repeating_section_one_-id3_attribute_two_value',
        'repeating_section_two_-id4_attribute_one':
          'repeating_section_two_-id4_attribute_one_value',
        'repeating_section_two_-id5_attribute_one':
          'repeating_section_two_-id5_attribute_one_value',
        'repeating_section_two_-id6_attribute_one':
          'repeating_section_two_-id6_attribute_one_value',
      })

      subject.getAttributes(
        [
          'repeating_section_one:attribute_one',
          'repeating_section_one:attribute_two',
          'repeating_section_two:attribute_one',
        ],
        (values) => {
          should(values).deepEqual({
            'repeating_section_one:attribute_one': [
              'repeating_section_one_-id1_attribute_one_value',
              'repeating_section_one_-id2_attribute_one_value',
              'repeating_section_one_-id3_attribute_one_value',
            ],
            'repeating_section_one:attribute_two': [
              'repeating_section_one_-id1_attribute_two_value',
              'repeating_section_one_-id2_attribute_two_value',
              'repeating_section_one_-id3_attribute_two_value',
            ],
            'repeating_section_two:attribute_one': [
              'repeating_section_two_-id4_attribute_one_value',
              'repeating_section_two_-id5_attribute_one_value',
              'repeating_section_two_-id6_attribute_one_value',
            ],
            repeating_section_one: {
              '-id1': {
                attribute_one: 'repeating_section_one_-id1_attribute_one_value',
                attribute_two: 'repeating_section_one_-id1_attribute_two_value',
              },
              '-id2': {
                attribute_one: 'repeating_section_one_-id2_attribute_one_value',
                attribute_two: 'repeating_section_one_-id2_attribute_two_value',
              },
              '-id3': {
                attribute_one: 'repeating_section_one_-id3_attribute_one_value',
                attribute_two: 'repeating_section_one_-id3_attribute_two_value',
              },
            },
            repeating_section_two: {
              '-id4': {
                attribute_one: 'repeating_section_two_-id4_attribute_one_value',
              },
              '-id5': {
                attribute_one: 'repeating_section_two_-id5_attribute_one_value',
              },
              '-id6': {
                attribute_one: 'repeating_section_two_-id6_attribute_one_value',
              },
            },
          })
        }
      )
    })

    it('should fetch both nested and non-nested attributes', function () {
      td.when(getSectionIDs('section_one')).thenCallback(['-id1', '-id2'])

      td.when(
        getAttrs([
          'repeating_section_one_-id1_attribute_one',
          'repeating_section_one_-id2_attribute_one',
          'non_repeating_attribute',
        ])
      ).thenCallback({
        'repeating_section_one_-id1_attribute_one':
          'repeating_section_one_-id1_attribute_one_value',
        'repeating_section_one_-id2_attribute_one':
          'repeating_section_one_-id2_attribute_one_value',
        non_repeating_attribute: 'non_repeating_attribute_value',
      })

      subject.getAttributes(
        ['repeating_section_one:attribute_one', 'non_repeating_attribute'],
        (values) => {
          should(values).deepEqual({
            non_repeating_attribute: 'non_repeating_attribute_value',
            'repeating_section_one:attribute_one': [
              'repeating_section_one_-id1_attribute_one_value',
              'repeating_section_one_-id2_attribute_one_value',
            ],
            repeating_section_one: {
              '-id1': {
                attribute_one: 'repeating_section_one_-id1_attribute_one_value',
              },
              '-id2': {
                attribute_one: 'repeating_section_one_-id2_attribute_one_value',
              },
            },
          })
        }
      )
    })
  })

  afterEach(function () {
    td.reset()
  })
})
