const React = require('react')
const PropTypes = require('prop-types')

function AbilityScoreGrid({ children }) {
  return (
    <div className="ability-score-grid">
      <div className="ability-score-grid__row ability-score-grid__row--heading">
        <div className="ability-score-grid__label">Score</div>
        <div className="ability-score-grid__label">Modifier</div>
        <div className="ability-score-grid__label">Penalty</div>
        <div className="ability-score-grid__label">Drain</div>
      </div>
      {children}
    </div>
  )
}

AbilityScoreGrid.propTypes = {
  children: PropTypes.node.isRequired,
}

AbilityScoreGrid.Row = function AbilityScoreRow({
  abbreviation,
  attribute,
  name,
}) {
  return (
    <div className="ability-score-grid__row">
      <div className="ability-score-grid__label">
        <div className="ability-score-grid__abbreviation">{abbreviation}</div>
        {name}
      </div>
      <div className="ability-score-grid__input">
        <input
          className="grid-input"
          type="text"
          name={`attr_${attribute}_base`}
          defaultValue="10"
        />
      </div>
      <div className="ability-score-grid__input">
        <span
          className="grid-input grid-input--disabled"
          name={`attr_${attribute}_mod`}
        />
      </div>
      <div className="ability-score-grid__input">
        <input
          className="grid-input"
          type="text"
          name={`attr_${attribute}_penalty`}
        />
      </div>
      <div className="ability-score-grid__input">
        <input
          className="grid-input"
          type="text"
          name={`attr_${attribute}_drain`}
        />
      </div>
    </div>
  )
}

AbilityScoreGrid.Row.propTypes = {
  abbreviation: PropTypes.string.isRequired,
  attribute: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

module.exports = AbilityScoreGrid
