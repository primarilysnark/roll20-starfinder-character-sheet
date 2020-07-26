const React = require('react')
const PropTypes = require('prop-types')

function Grid({ children }) {
  const childArray = React.Children.toArray(children)
  const heading = childArray.filter((child) => child.type === GridHeading)[0]
  const rows = childArray.filter((child) => child.type !== GridHeading)

  const columnSizes = React.Children.toArray(heading.props.children).map(
    (child) => child.props.size
  )

  return (
    <div className={`grid-layout grid-layout--${columnSizes.join('-')}`}>
      <div className="grid-layout__row grid-layout__row--heading">
        {heading}
      </div>
      {rows}
    </div>
  )
}

Grid.propTypes = {
  children: PropTypes.node.isRequired,
}

function GridHeading({ children }) {
  return <React.Fragment>{children}</React.Fragment>
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

function GridLabel({ children, starting }) {
  return (
    <div
      className={`grid-layout__label ${
        starting ? 'grid-layout__label--starting' : ''
      }`}
    >
      {children}
    </div>
  )
}

GridLabel.propTypes = {
  children: PropTypes.node.isRequired,
  starting: PropTypes.bool,
}

GridLabel.defaultProps = {
  starting: false,
}

function GridInput({ align, attribute, options, defaultValue, type }) {
  const style = {}

  if (align) {
    style.textAlign = align
  }

  switch (type) {
    case 'select':
      return (
        <div className="grid-layout__input">
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
        <div className="grid-layout__input">
          <input name={attribute} type="checkbox" />
        </div>
      )

    case 'text':
    default:
      return (
        <div className="grid-layout__input">
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
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  ]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
}

GridInput.defaultProps = {
  type: 'text',
}

Grid.Heading = GridHeading
Grid.Input = GridInput
Grid.Label = GridLabel
Grid.Row = GridRow

module.exports = Grid
