const React = require('react')
const PropTypes = require('prop-types')

const { getBasicMacroRoll } = require('./utils/rolls')

function SectionBlock({
  className,
  children,
  rollable,
  rollName,
  standalone,
  title,
}) {
  return (
    <div
      className={`section-block${className ? ` ${className}` : ''}${
        standalone ? ' section-block--standalone' : ''
      }`}
    >
      {rollable ? (
        <button
          className="section-block__heading"
          type="roll"
          value={getBasicMacroRoll(rollName, rollable)}
        >
          {title}
          <span className="section-block__heading__rollable" />
        </button>
      ) : (
        <h2 className="section-block__heading">{title}</h2>
      )}
      {children}
    </div>
  )
}

SectionBlock.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  rollable: PropTypes.string,
  rollName: PropTypes.string,
  standalone: PropTypes.bool,
  title: PropTypes.string.isRequired,
}

SectionBlock.defaultProps = {
  standalone: false,
}

module.exports = SectionBlock
