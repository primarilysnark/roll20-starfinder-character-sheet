const React = require('react')

const Roll = require('./components/roll')

function RollTemplates() {
  return (
    <Roll.Template name="base">
      <div className="sheet-template">
        <div className="sheet-template__roll">
          <div className="sheet-template__header">
            <Roll.Field name="rollname" />
          </div>
          <div className="sheet-template__result">
            <Roll.Field name="result" />
          </div>
        </div>

        <Roll.ConditionalIf name="notes">
          <div className="sheet-template__notes">
            <strong>Notes:</strong>&nbsp;
            <Roll.Field name="notes" />
          </div>
        </Roll.ConditionalIf>
      </div>
    </Roll.Template>
  )
}

module.exports = RollTemplates
