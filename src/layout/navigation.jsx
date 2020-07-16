const React = require('react')
const PropTypes = require('prop-types')

function NavItem({ isActive, children }) {
  return (
    <li>
      <button
        className={`navigation-option ${
          isActive ? 'navigation-option--active' : ''
        }`}
      >
        {children}
      </button>
    </li>
  )
}

NavItem.propTypes = {
  isActive: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

NavItem.defaultProps = {
  isActive: false,
}

module.exports = function Navigation() {
  return (
    <nav className="navigation">
      <ul className="navigation-grid">
        <NavItem isActive>Character</NavItem>
        <NavItem>Feats and Abilities</NavItem>
        <NavItem>Equipment</NavItem>
        <NavItem>Spells</NavItem>
        <NavItem>Options</NavItem>
      </ul>
    </nav>
  )
}
