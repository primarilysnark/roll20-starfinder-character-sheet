const React = require('react')
const PropTypes = require('prop-types')

function Grid({ children, compact }) {
  const childArray = React.Children.toArray(children)
  const header = childArray.filter((child) => child.type === GridHeader)[0]
  const rows = childArray.filter((child) => child.type !== GridHeader)

  const headerChildren = React.Children.toArray(header.props.children)
  const columnSizes = headerChildren.map((child) => child.props.size)
  const headerIsEmpty = headerChildren.every(
    (child) => child.type === GridSpacer
  )

  return (
    <div
      className={`grid-layout grid-layout--${columnSizes.join('-')}${
        compact ? ' grid-layout--compact' : ''
      }`}
    >
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
  compact: PropTypes.bool,
}

Grid.defaultProps = {
  compact: false,
}

function GridAbbreviation({ abbr, children }) {
  return (
    <div className="grid-layout__label grid-layout__label--abbreviated">
      <div className="grid-layout__label__abbreviation">{abbr}</div>
      {children}
    </div>
  )
}

GridAbbreviation.propTypes = {
  abbr: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

function GridBlockLabel({ children }) {
  return <div className="grid-layout__block-label">{children}</div>
}

GridBlockLabel.propTypes = {
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

function GridInput({
  align,
  attribute,
  compact,
  disabled,
  options,
  overlay,
  defaultValue,
  type,
}) {
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
      if (overlay) {
        return (
          <div
            className={`grid-layout__input${
              compact ? ' grid-layout__input--compact' : ''
            }`}
          >
            <div className="grid-layout__input__field grid-layout__input__field--overlay">
              <span name={overlay} />
            </div>
            <input
              defaultValue={defaultValue}
              name={attribute}
              style={style}
              type="text"
            />
          </div>
        )
      }

      if (disabled) {
        return (
          <div
            className={`grid-layout__input${
              compact ? ' grid-layout__input--compact' : ''
            }`}
          >
            <span
              className="grid-layout__input__field grid-layout__input__field--disabled"
              name={attribute}
              style={style}
            >
              {defaultValue}
            </span>
          </div>
        )
      }

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
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  ]),
  overlay: PropTypes.string,
  type: PropTypes.string,
}

GridInput.defaultProps = {
  compact: false,
  disabled: false,
  type: 'text',
}

function GridSeparator() {
  return <div className="grid-layout__row grid-layout__row--separator" />
}

function GridSpacer() {
  return <div />
}

GridSpacer.propTypes = {
  size: PropTypes.string.isRequired,
}

Grid.Abbreviation = GridAbbreviation
Grid.BlockLabel = GridBlockLabel
Grid.Header = GridHeader
Grid.Heading = GridHeading
Grid.Input = GridInput
Grid.Label = GridLabel
Grid.Row = GridRow
Grid.Separator = GridSeparator
Grid.Spacer = GridSpacer

module.exports = Grid
