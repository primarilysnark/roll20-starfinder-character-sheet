const React = require('react')
const PropTypes = require('prop-types')

function IconButton({ attribute, defaultValue, icon }) {
  return (
    <label className="icon-button">
      <input name={attribute} type="checkbox" value={defaultValue || '1'} />
      <span className="icon-button__icon">{icon}</span>
    </label>
  )
}

IconButton.propTypes = {
  attribute: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  icon: PropTypes.string.isRequired,
}

module.exports = IconButton
