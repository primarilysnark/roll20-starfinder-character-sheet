const React = require('react')
const PropTypes = require('prop-types')

function IconButton({ attribute, defaultValue, icon, title }) {
  return (
    <label className="icon-button" title={title}>
      <input name={attribute} type="checkbox" value={defaultValue || '1'} />
      <span className="icon-button__icon">{icon}</span>
    </label>
  )
}

IconButton.propTypes = {
  attribute: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

module.exports = IconButton
