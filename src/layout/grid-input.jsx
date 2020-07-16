const React = require('react')
const PropTypes = require('prop-types')

function GridInput({ attribute, disabled, overlayAttribute, value }) {
  if (!overlayAttribute && !disabled) {
    return (
      <input
        className="grid-input"
        defaultValue={value}
        name={attribute}
        type="text"
      />
    )
  }

  if (!overlayAttribute) {
    return <span className="grid-input grid-input--disabled" name={attribute} />
  }

  return (
    <div className="grid-input__wrapper">
      <div className="grid-input__overlay grid-input">
        <span name={overlayAttribute} />
      </div>
      <input
        className="grid-input"
        defaultValue={value}
        name={attribute}
        type="text"
      />
    </div>
  )
}

GridInput.propTypes = {
  attribute: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  overlayAttribute: PropTypes.string,
  value: PropTypes.string,
}

GridInput.defaultProps = {
  disabled: false,
  value: '',
}

module.exports = GridInput
