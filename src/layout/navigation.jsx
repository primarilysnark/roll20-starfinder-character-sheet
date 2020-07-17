const React = require('react')
const PropTypes = require('prop-types')

function NavItem({ children, name }) {
  return (
    <li>
      <button
        className="navigation-option"
        name={`act_navigation_${name}`}
        type="action"
      >
        {children}
      </button>
    </li>
  )
}

NavItem.propTypes = {
  children: PropTypes.node.isRequired,
  isActive: PropTypes.bool,
  name: PropTypes.string.isRequired,
}

NavItem.defaultProps = {
  isActive: false,
}

module.exports = function Navigation() {
  return (
    <nav className="navigation">
      <ul className="navigation-grid">
        <input
          className="navigation-control"
          type="hidden"
          name="attr_navigation_tab"
          value="character"
        />
        <NavItem name="character">Character</NavItem>
        <NavItem name="feats">Feats and Abilities</NavItem>
        <NavItem name="equipment">Equipment</NavItem>
        <NavItem name="spells">Spells</NavItem>
        <NavItem name="options">Options</NavItem>
      </ul>
    </nav>
  )
}
