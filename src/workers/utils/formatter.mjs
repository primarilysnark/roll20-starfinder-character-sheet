export const parseBoolean = (value) => {
  if (value == null || value === '') {
    return null
  }

  if (value === '1') {
    return true
  }

  return false
}

export const formatBoolean = (value) => {
  if (value === true) {
    return '1'
  }

  if (value === false) {
    return '0'
  }

  return ''
}

export const parseBulk = (value) => {
  if (value == null || value == '') {
    return null
  }

  if (typeof value === 'number') {
    return value
  }

  if (typeof value !== 'string') {
    return null
  }

  if (value.toUpperCase() === 'L') {
    return 1 / 10
  }

  const parsedInt = parseInt(value, 10)
  if (isNaN(parsedInt)) {
    throw new Error('Provided bulk value must be an integer number or L.')
  }

  return parsedInt
}

export const formatBulk = (value) => {
  if (value === 0) {
    return value.toString()
  }

  if (value < 1) {
    return 'L'
  }

  return Math.floor(value).toString()
}

export const parseModifier = (value) => {
  if (value == null || value == '') {
    return null
  }

  if (typeof value === 'number') {
    return value
  }

  if (value.startsWith('–')) {
    return -1 * parseInt(value.substring(1), 10)
  }

  if (value.startsWith('+')) {
    return parseInt(value.substring(1), 10)
  }

  return parseInt(value, 10)
}

export const formatModifier = (value) => {
  if (value > 0) {
    return `+${value}`
  }

  if (value < 0) {
    return `–${Math.abs(value)}`
  }

  return `${Math.abs(value)}`
}

export const parseInteger = (value) => {
  if (value == null || value === '') {
    return null
  }

  if (typeof value !== 'number') {
    const parsedInt = parseInt(value, 10)
    if (isNaN(parsedInt)) {
      throw new Error('Provided value must be an integer number.')
    }

    return parsedInt
  }

  if (!Number.isInteger(value)) {
    return Math.round(value)
  }

  return value
}

export const formatInteger = (value) => value.toString()

export const parseDamage = (value) => {
  if (value == null) {
    return null
  }

  const trimmedValue = value.replace(/\s+/g, '')
  if (trimmedValue === '') {
    return null
  }

  const damageNotation = []
  const damageRegex = /([+\-–])?(?:(\d+)[dD](\d+)|(\d+))(?:\[([A-Za-z]+)\])?/g
  let damageEntry

  while ((damageEntry = damageRegex.exec(trimmedValue)) !== null) {
    let [, operation, diceCount, diceSize, modifierSize, kind] = damageEntry
    switch (damageEntry[1]) {
      case '-':
      case '–':
        operation = 'subtraction'
        break

      case '+':
      default:
        operation = 'addition'
        break
    }

    const entry = {
      operation,
    }

    if (kind) {
      entry.kind = kind
    }

    if (diceCount && diceSize) {
      entry.count = parseInteger(diceCount)
      entry.size = parseInteger(diceSize)
      entry.type = 'dice'
    } else if (modifierSize) {
      entry.size = parseInteger(modifierSize)
      entry.type = 'modifier'
    }

    damageNotation.push(entry)
  }

  return damageNotation
}

export const formatDamage = (value) => {
  if (value == null || !Array.isArray(value)) {
    return ''
  }

  return value
    .map((damageNotation, index) => {
      let result = ''

      if (index !== 0) {
        if (damageNotation.operation === 'addition') {
          result += '+ '
        } else {
          result += '- '
        }
      }

      if (damageNotation.type === 'dice') {
        result += `${damageNotation.count}d${damageNotation.size}`
      } else {
        result += damageNotation.size
      }

      if (damageNotation.kind) {
        result += `[${damageNotation.kind}]`
      }

      return result
    })
    .join(' ')
}
