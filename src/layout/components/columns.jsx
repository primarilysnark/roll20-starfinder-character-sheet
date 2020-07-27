const React = require('react')
const PropTypes = require('prop-types')

function ColumnLayout({ children }) {
  const columnSizes = React.Children.toArray(children).map(
    (child) => child.props.size
  )

  return (
    <div className={`column-layout column-layout--${columnSizes.join('-')}`}>
      {children}
    </div>
  )
}

ColumnLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

function Column({ children }) {
  return <div className="column-layout__column">{children}</div>
}

Column.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.string.isRequired,
}

ColumnLayout.Column = Column

module.exports = ColumnLayout
