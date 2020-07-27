const React = require('react')
const PropTypes = require('prop-types')

function Grid({ children }) {
  const childArray = React.Children.toArray(children)
  const header = childArray.filter((child) => child.type === GridHeader)[0]
  const rows = childArray.filter((child) => child.type !== GridHeader)

  const headerChildren = React.Children.toArray(header.props.children)
  const columnSizes = headerChildren.map((child) => child.props.size)
  const headerIsEmpty = headerChildren.every(
    (child) => child.type === GridSpacer
  )

  return (
    <div className={`grid-layout grid-layout--${columnSizes.join('-')}`}>
      {headerIsEmpty ? null : (
        <div className="grid-layout__row grid-layout__row--header">
          {header}
        </div>
      )}
      {rows}
    </div>
  )
}

Grid.propTypes = {
  children: PropTypes.node.isRequired,
}

function GridHeader({ children }) {
  return <React.Fragment>{children}</React.Fragment>
}

GridHeader.propTypes = {
  children: PropTypes.node.isRequired,
}

function GridHeading({ children }) {
  return (
    <div className="grid-layout__row grid-layout__row--heading">
      <h3>{children}</h3>
    </div>
  )
}

GridHeading.propTypes = {
  children: PropTypes.node.isRequired,
}

function GridRow({ children }) {
  return <div className="grid-layout__row">{children}</div>
}

GridRow.propTypes = {
  children: PropTypes.node.isRequired,
}

function GridLabel({ align, children, compact }) {
  const style = {}

  if (align) {
    style.textAlign = align
  }

  return (
    <div
      className={`grid-layout__label
      ${compact ? ' grid-layout__label--compact' : ''}`}
      style={style}
    >
      {children}
    </div>
  )
}

GridLabel.propTypes = {
  align: PropTypes.string,
  children: PropTypes.node.isRequired,
  compact: PropTypes.bool,
}

GridLabel.defaultProps = {
  compact: false,
}

function GridInput({ align, attribute, compact, options, defaultValue, type }) {
  const style = {}

  if (align) {
    style.textAlign = align
  }

  switch (type) {
    case 'select':
      return (
        <div
          className={`grid-layout__input${
            compact ? ' grid-layout__input--compact' : ''
          }`}
        >
          <select name={attribute}>
            {options.map((option, index) => {
              if (Array.isArray(option)) {
                return (
                  <option
                    key={index}
                    value={option[0]}
                    selected={option[0] === defaultValue}
                  >
                    {option[1]}
                  </option>
                )
              }

              return (
                <option
                  key={index}
                  value={option}
                  selected={option === defaultValue}
                >
                  {option}
                </option>
              )
            })}
          </select>
        </div>
      )

    case 'checkbox':
      return (
        <div
          className={`grid-layout__input${
            compact ? ' grid-layout__input--compact' : ''
          }`}
        >
          <input name={attribute} type="checkbox" />
        </div>
      )

    case 'text':
    default:
      return (
        <div
          className={`grid-layout__input${
            compact ? ' grid-layout__input--compact' : ''
          }`}
        >
          <input
            defaultValue={defaultValue}
            name={attribute}
            style={style}
            type="text"
          />
        </div>
      )
  }
}

GridInput.propTypes = {
  align: PropTypes.string,
  attribute: PropTypes.string.isRequired,
  compact: PropTypes.bool,
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  ]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
}

GridInput.defaultProps = {
  compact: false,
  type: 'text',
}

function GridSpacer() {
  return <div />
}

GridSpacer.propTypes = {
  size: PropTypes.string.isRequired,
}

Grid.Header = GridHeader
Grid.Heading = GridHeading
Grid.Input = GridInput
Grid.Label = GridLabel
Grid.Row = GridRow
Grid.Spacer = GridSpacer

module.exports = Grid
