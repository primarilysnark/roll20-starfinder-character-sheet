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
