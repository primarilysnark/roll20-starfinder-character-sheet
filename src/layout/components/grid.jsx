const React = require('react')
const PropTypes = require('prop-types')

const Icon = require('./icon')
const { getBasicMacroRoll } = require('../utils/rolls')

function Grid({ children, compact, inverse, tall }) {
  const childArray = React.Children.toArray(children)
  const rows = childArray.filter((child) => child.type !== GridHeader)
  const header = childArray.filter((child) => child.type === GridHeader)[0]

  let headerChildren = React.Children.toArray(header.props.children)
  const columnSizes = headerChildren.map((child) =>
    child.props.size.replace(/\./g, '_')
  )
  const headerIsEmpty = headerChildren.every(
    (child) => child.type === GridSpacer
  )

  if (!headerIsEmpty) {
    headerChildren.forEach((child, index) => {
      if (child.props.span) {
        headerChildren = headerChildren
          .slice(0, index - 1)
          .concat([child])
          .concat(headerChildren.slice(index + 2))
      }
    })
  }

  return (
    <div
      className={`grid-layout grid-layout--${columnSizes.join('-')}${
        compact ? ' grid-layout--compact' : ''
      }`}
    >
      {headerIsEmpty || inverse ? null : (
        <div
          className={`grid-layout__row grid-layout__row--header${
            tall ? ' grid-layout__row--header-tall' : ''
          }`}
        >
          {headerChildren}
        </div>
      )}
      {rows}

      {headerIsEmpty || !inverse ? null : (
        <div
          className={`grid-layout__row grid-layout__row--header${
            tall ? ' grid-layout__row--header-tall' : ''
          }`}
        >
          {headerChildren}
        </div>
      )}
    </div>
  )
}

Grid.propTypes = {
  children: PropTypes.node.isRequired,
  compact: PropTypes.bool,
  inverse: PropTypes.bool,
  tall: PropTypes.bool,
}

Grid.defaultProps = {
  compact: false,
  inverse: false,
  tall: false,
}

function GridAbbreviation({ abbr, children, name, notes, rollable, rollName }) {
  if (rollable) {
    return (
      <button
        className="grid-layout__label grid-layout__label--abbreviated"
        type="roll"
        name={name}
        value={getBasicMacroRoll(rollName || abbr, rollable, notes)}
      >
        <div className="grid-layout__label__abbreviation">{abbr}</div>
        {children}
      </button>
    )
  }

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
  name: PropTypes.string,
  notes: PropTypes.string,
  rollable: PropTypes.string,
  rollName: PropTypes.string,
}

function GridBlockLabel({ children, floating, rollable, rollName }) {
  if (rollable) {
    return (
      <button
        className={`grid-layout__block-label${
          floating ? ' grid-layout__block-label--floating' : ''
        }`}
        type="roll"
        name={rollName}
        value={getBasicMacroRoll(rollName, rollable)}
      >
        {children}
      </button>
    )
  }

  return (
    <div
      className={`grid-layout__block-label${
        floating ? ' grid-layout__block-label--floating' : ''
      }`}
    >
      {children}
    </div>
  )
}

GridBlockLabel.propTypes = {
  children: PropTypes.node.isRequired,
  floating: PropTypes.bool,
  rollable: PropTypes.string,
  rollName: PropTypes.string,
}

GridBlockLabel.defaultProps = {
  floating: false,
}

function GridToggle({ children, floating, isActive }) {
  return (
    <div
      className={`grid-layout__block-label grid-layout__block-label--toggle${
        isActive ? ' grid-layout__block-label--toggle-active' : ''
      }${floating ? ' grid-layout__block-label--floating' : ''}`}
    >
      {isActive ? <Icon.Check /> : null}
      {children}
    </div>
  )
}

GridToggle.propTypes = {
  children: PropTypes.node.isRequired,
  floating: PropTypes.bool,
  isActive: PropTypes.bool,
}

GridToggle.defaultProps = {
  floating: false,
  isActive: false,
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

function GridFloatButton({ children, name }) {
  return (
    <div
      className={`grid-layout__float-button grid-layout__float-button--${name}`}
    >
      {children}
    </div>
  )
}

GridFloatButton.propTypes = {
  children: PropTypes.node.isRequired,
}

function GridFullWidth({ children }) {
  return (
    <div className="grid-layout__row grid-layout__row--full-width">
      {children}
    </div>
  )
}

GridFullWidth.propTypes = {
  children: PropTypes.node.isRequired,
}

function GridRow({ children, spaced }) {
  return (
    <div
      className={`grid-layout__row${spaced ? ' grid-layout__row--spaced' : ''}`}
    >
      {children}
    </div>
  )
}

GridRow.propTypes = {
  children: PropTypes.node.isRequired,
  spaced: PropTypes.bool,
}

GridRow.defaultProps = {
  spaced: false,
}

function GridLabel({
  align,
  children,
  compact,
  flat,
  notes,
  rollable,
  rollName,
  span,
}) {
  const style = {}

  if (align) {
    style.textAlign = align
  }

  if (rollable) {
    return (
      <button
        className={`grid-layout__label${
          compact ? ' grid-layout__label--compact' : ''
        }${flat ? ' grid-layout__label--flat' : ''}${
          span ? ' grid-layout__label--span' : ''
        }`}
        name={rollName}
        style={style}
        type="roll"
        value={getBasicMacroRoll(rollName, rollable, notes)}
      >
        {children}
      </button>
    )
  }

  return (
    <div
      className={`grid-layout__label${
        compact ? ' grid-layout__label--compact' : ''
      }${flat ? ' grid-layout__label--flat' : ''}${
        span ? ' grid-layout__label--span' : ''
      }`}
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
  flat: PropTypes.bool,
  notes: PropTypes.string,
  rollable: PropTypes.string,
  rollName: PropTypes.string,
  span: PropTypes.bool,
}

GridLabel.defaultProps = {
  compact: false,
  flat: false,
  span: false,
}

function GridInput({
  align,
  attribute,
  className,
  compact,
  defaultOverlay,
  defaultValue,
  disabled,
  options,
  overlay,
  placeholder,
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
          }${className ? ` ${className}` : ''}`}
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
          }${className ? ` ${className}` : ''}`}
        >
          <input name={attribute} type="checkbox" value={defaultValue || '1'} />
        </div>
      )

    case 'textarea':
      return (
        <div
          className={`grid-layout__input${
            compact ? ' grid-layout__input--compact' : ''
          }${className ? ` ${className}` : ''}`}
        >
          <textarea
            defaultValue={defaultValue}
            name={attribute}
            placeholder={placeholder}
            style={style}
            type="text"
          />
        </div>
      )

    case 'text':
    default:
      if (overlay) {
        return (
          <div
            className={`grid-layout__input${
              compact ? ' grid-layout__input--compact' : ''
            }${className ? ` ${className}` : ''}`}
          >
            <div className="grid-layout__input__field grid-layout__input__field--overlay">
              <span name={overlay}>{defaultOverlay}</span>
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
            }${className ? ` ${className}` : ''}`}
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
          }${className ? ` ${className}` : ''}`}
        >
          <input
            defaultValue={defaultValue}
            name={attribute}
            placeholder={placeholder}
            style={style}
            type="text"
          />
        </div>
      )
  }
}

GridInput.propTypes = {
  align: PropTypes.string,
  attribute: PropTypes.string,
  className: PropTypes.string,
  compact: PropTypes.bool,
  defaultOverlay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  ]),
  overlay: PropTypes.string,
  placeholder: PropTypes.string,
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
  size: PropTypes.string,
}

Grid.Abbreviation = GridAbbreviation
Grid.BlockLabel = GridBlockLabel
Grid.FloatButton = GridFloatButton
Grid.FullWidth = GridFullWidth
Grid.Header = GridHeader
Grid.Heading = GridHeading
Grid.Input = GridInput
Grid.Label = GridLabel
Grid.Row = GridRow
Grid.Separator = GridSeparator
Grid.Spacer = GridSpacer
Grid.Toggle = GridToggle

module.exports = Grid
