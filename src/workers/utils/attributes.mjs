const repeatingRegex = /([a-zA-Z0-9_]+)_(-[a-zA-Z0-9]*)_([a-zA-Z0-9_]+)$/

export function parseAttributeName(attributeName) {
  if (attributeName.startsWith('repeating')) {
    if (!repeatingRegex.test(attributeName)) {
      throw new Error('Given repeating attribute name is invalid.')
    }

    const [, kind, sectionID, attribute] = attributeName.match(repeatingRegex)

    return {
      attribute: `${kind}:${attribute}`,
      repeating: {
        kind,
        sectionID,
        attribute,
      },
    }
  }

  return {
    attribute: attributeName,
  }
}

export function validateAttribute(attribute) {
  if (!attribute) {
    throw new Error('Attribute must be defined.')
  }

  if (!attribute.name) {
    throw new Error('Attribute must have a given name.')
  }

  if (!attribute.dependencies || !Array.isArray(attribute.dependencies)) {
    throw new Error('Dependencies must be an array.')
  }

  if (attribute.dependencies.length > 0 && attribute.calculate == null) {
    throw new Error('Raw attributes must not have dependencies.')
  }

  if (attribute.calculate != null && attribute.dependencies.length === 0) {
    throw new Error('Calculated attributes must have dependencies.')
  }

  if (
    (attribute.parse != null && attribute.format == null) ||
    (attribute.format != null && attribute.parse == null)
  ) {
    throw new Error('Attribute must have both format and parse or neither.')
  }

  return true
}
