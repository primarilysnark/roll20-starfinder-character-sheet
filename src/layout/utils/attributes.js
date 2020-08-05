const find = require('lodash/find')

const attributes = require('../data/attributes')

function getAbbreviationForAttribute(attribute) {
  return find(attributes, ['name', attribute]).abbr
}

module.exports = {
  getAbbreviationForAttribute,
}
