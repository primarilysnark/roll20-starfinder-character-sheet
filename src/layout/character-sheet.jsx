const React = require('react')
const PropTypes = require('prop-types')

const ErrorToast = require('./error-toast')

function CharacterSheet({ children }) {
  return (
    <div className="character-sheet">
      <ErrorToast />

      <nav className="navigation">
        <ul className="navigation-grid">
          <input
            className="navigation-control"
            type="hidden"
            name="attr_navigation_tab"
            value="character"
          />
          {React.Children.map(children, (child) => {
            return (
              <li>
                <button
                  className="navigation-option"
                  name={`act_navigation_${child.props.name}`}
                  type="action"
                >
                  {child.props.label}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="tabs">
        <input
          className="navigation-control"
          type="hidden"
          name="attr_navigation_tab"
          value="character"
        />

        {children}
      </div>
    </div>
  )
}

CharacterSheet.propTypes = {
  children: PropTypes.node.isRequired,
}

CharacterSheet.Tab = function CharacterSheetTab({ children, name }) {
  return (
    <div className={`character-tab character-tab--${name}`}>{children}</div>
  )
}

CharacterSheet.Tab.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}

module.exports = CharacterSheet
