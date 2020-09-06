const React = require('react')
const PropTypes = require('prop-types')

function Icon({ children }) {
  return <span className="icon">{children}</span>
}

Icon.propTypes = {
  children: PropTypes.node.isRequired,
}

function CheckIcon() {
  return <Icon>3</Icon>
}

module.exports = {
  Check: CheckIcon,
}
