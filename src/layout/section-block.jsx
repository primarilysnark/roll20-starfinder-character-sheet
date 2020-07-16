const React = require('react')
const PropTypes = require('prop-types')

function SectionBlock({ className, children, title }) {
  return (
    <div className={`section-block ${className}`}>
      <h2 className="section-block__heading">{title}</h2>
      {children}
    </div>
  )
}

SectionBlock.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
}

module.exports = SectionBlock
