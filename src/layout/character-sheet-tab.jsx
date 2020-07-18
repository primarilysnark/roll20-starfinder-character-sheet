const React = require('react')
const PropTypes = require('prop-types')

function CharacterSheetTab({ children, name }) {
  return (
    <div className={`character-tab character-tab--${name}`}>{children}</div>
  )
}

CharacterSheetTab.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
}

module.exports = CharacterSheetTab
