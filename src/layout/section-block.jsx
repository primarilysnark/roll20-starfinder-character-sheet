const React = require('react')
const PropTypes = require('prop-types')

function SectionBlock({ className, children, standalone, title }) {
  return (
    <div
      className={`section-block${className ? ` ${className}` : ''}${
        standalone ? ' section-block--standalone' : ''
      }`}
    >
      <h2 className="section-block__heading">{title}</h2>
      {children}
    </div>
  )
}

SectionBlock.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  standalone: PropTypes.bool,
  title: PropTypes.string.isRequired,
}

SectionBlock.defaultProps = {
  standalone: false,
}

module.exports = SectionBlock
