export const sum = (values, dependencies) =>
  dependencies
    .map((dependency) => values[dependency] || 0)
    .flat()
    .reduce((sum, value) => sum + value, 0)

export const sumWithBase = (base) => (values, dependencies) =>
  dependencies
    .map((dependency) => values[dependency] || 0)
    .flat()
    .reduce((sum, value) => sum + value, base)

function findMatchingNotationIndex(
  notation,
  possibleNotations,
  { matchKind = false } = {}
) {
  let index = -1
  while (++index < possibleNotations.length) {
    const possibleNotation = possibleNotations[index]

    if (notation.type !== possibleNotation.type) {
      continue
    }

    if (matchKind && notation.kind && notation.kind !== possibleNotation.kind) {
      continue
    }

    if (notation.type === 'dice') {
      if (notation.size !== possibleNotation.size) {
        continue
      }

      return index
    }

    if (notation.type === 'modifier') {
      return index
    }
  }

  return -1
}

export const sumDamage = ({ matchKind = true } = {}) => (
  values,
  dependencies
) => {
  const dependencyValues = dependencies.map((dependency) => values[dependency])

  if (
    dependencyValues.some((value) => value !== null && !Array.isArray(value))
  ) {
    throw new Error('Not all dependencies were damage dependencies')
  }

  return dependencyValues
    .filter((dependency) => dependency !== null)
    .reduce((base, dependency) => {
      const notations = [...base]

      dependency.forEach((notation) => {
        const matchingNotationIndex = findMatchingNotationIndex(
          notation,
          notations,
          {
            matchKind,
          }
        )

        if (matchingNotationIndex === -1) {
          notations.push(notation)
        } else {
          const matchingNotation = notations[matchingNotationIndex]

          if (notation.kind) {
            if (matchingNotation.operation === 'addition') {
              if (notation.operation === 'addition') {
                matchingNotation.count = Math.max(
                  notation.count,
                  matchingNotation.count
                )
              }
            } else {
              if (notation.operation === 'addition') {
                matchingNotation.count = notation.count
                matchingNotation.operation = 'addition'
              } else {
                matchingNotation.count = Math.min(
                  notation.count,
                  matchingNotation.count
                )
              }
            }

            notations[matchingNotationIndex] = matchingNotation
          } else if (matchingNotation.operation === 'addition') {
            if (notation.operation === 'addition') {
              matchingNotation.count += notation.count
            } else {
              matchingNotation.count -= notation.count
            }

            if (matchingNotation.count < 0) {
              matchingNotation.count = Math.abs(matchingNotation.count)
              matchingNotation.operation = 'subtraction'

              notations[matchingNotationIndex] = matchingNotation
            } else if (matchingNotation.count === 0) {
              notations.splice(matchingNotationIndex, 1)
            } else {
              notations[matchingNotationIndex] = matchingNotation
            }
          } else {
            if (notation.operation === 'addition') {
              matchingNotation.count -= notation.count
            } else {
              matchingNotation.count += notation.count
            }

            if (matchingNotation.count < 0) {
              matchingNotation.count = Math.abs(matchingNotation.count)
              matchingNotation.operation = 'addition'

              notations[matchingNotationIndex] = matchingNotation
            } else if (matchingNotation.count === 0) {
              notations.splice(matchingNotationIndex, 1)
            } else {
              notations[matchingNotationIndex] = matchingNotation
            }
          }
        }
      })

      return notations
    }, [])
    .sort((first, second) => {
      if (first.type === 'dice' && second.type !== 'dice') {
        return -1
      }

      if (first.type !== 'dice' && second.type === 'dice') {
        return 1
      }

      if (first.type === 'dice') {
        if (first.size < second.size) {
          return -1
        }

        if (first.size > second.size) {
          return 1
        }

        if (first.count > second.count) {
          return -1
        }

        if (first.count < second.count) {
          return 1
        }

        return 0
      }

      if (first.type === 'modifier') {
        if (first.size < second.size) {
          return -1
        }

        if (first.size > second.size) {
          return 1
        }

        return 0
      }
    })
}
