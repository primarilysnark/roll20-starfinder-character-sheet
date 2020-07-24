/* global getAttrs: false, getSectionIDs: false, on: false, setAttrs: false */
import { parseAttributeName } from './attributes.mjs'

export const isNestedAttribute = (attributeName) => attributeName.includes(':')

function getSectionIDsForSections(
  repeatingSections,
  callback,
  sectionIDsBySection = {}
) {
  const [repeatingSection, ...rest] = repeatingSections

  getSectionIDs(repeatingSection.substring(10), (sectionIDs) => {
    const sectionIDsMap = {
      ...sectionIDsBySection,
      [repeatingSection]: sectionIDs,
    }

    if (rest.length !== 0) {
      getSectionIDsForSections(rest, callback, sectionIDsMap)
    } else {
      callback(sectionIDsMap)
    }
  })
}

export const getAttributes = (names, callback) => {
  if (!names.some(isNestedAttribute)) {
    return getAttrs(names, callback)
  }

  const repeatingSections = names
    .filter(isNestedAttribute)
    .map((name) => name.split(':'))
    .reduce(
      (acc, [repeatingSection, attribute]) => ({
        ...acc,
        [repeatingSection]: [...(acc[repeatingSection] || []), attribute],
      }),
      {}
    )

  getSectionIDsForSections(
    Object.keys(repeatingSections),
    (sectionIDsbySection) => {
      const nestedAttributes = Object.keys(repeatingSections)
        .map((repeatingSection) => {
          const attributeKeys = repeatingSections[repeatingSection]
          const sectionIDs = sectionIDsbySection[repeatingSection]

          return sectionIDs
            .map((sectionID) => {
              return attributeKeys.map((attributeKey) => {
                return `${repeatingSection}_${sectionID}_${attributeKey}`
              })
            })
            .flat()
        })
        .flat()

      getAttrs(
        [
          ...names.filter((name) => !isNestedAttribute(name)),
          ...nestedAttributes,
        ],
        (values) => {
          const result = Object.keys(values)
            .map((attributeKey) => {
              const attributeName = parseAttributeName(attributeKey)

              return {
                ...attributeName,
                value: values[attributeKey],
              }
            })
            .reduce((map, { attribute, repeating, value }) => {
              if (!repeating) {
                return {
                  ...map,
                  [attribute]: value,
                }
              }

              const kindEntry = map[repeating.kind] || {}
              const sectionEntry = {
                ...(kindEntry[repeating.sectionID] || {}),
                [repeating.attribute]: value,
              }

              return {
                ...map,
                [attribute]: [...(map[attribute] || []), value],
                [repeating.kind]: {
                  ...kindEntry,
                  [repeating.sectionID]: sectionEntry,
                },
              }
            }, {})

          callback(result)
        }
      )
    }
  )
}

export const addEventListener = (name, listener) => on(name, listener)

export const setAttributes = (attributeMap, options) =>
  setAttrs(attributeMap, options)
