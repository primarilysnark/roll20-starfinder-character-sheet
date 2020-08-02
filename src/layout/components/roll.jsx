const React = require('react')
const PropTypes = require('prop-types')

function RollTemplate({ children, name }) {
  return (
    <rolltemplate className={`sheet-rolltemplate-${name}`}>
      {children}
    </rolltemplate>
  )
}

RollTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
}

function ConditionalIf({ name, children }) {
  return (
    <React.Fragment>
      {`{{#${name}}}`}
      {children}
      {`{{/${name}}}`}
    </React.Fragment>
  )
}

ConditionalIf.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

function Field({ name }) {
  return <React.Fragment>{`{{${name}}}`}</React.Fragment>
}

Field.propTypes = {
  name: PropTypes.string.isRequired,
}

module.exports = {
  ConditionalIf: ConditionalIf,
  Field: Field,
  Template: RollTemplate,
}
