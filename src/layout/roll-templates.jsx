const React = require('react')

const Roll = require('./components/roll')

function RollTemplates() {
  return (
    <React.Fragment>
      <Roll.Template name="base">
        <div className="sheet-template">
          <Roll.ConditionalIf name="rollTotal() show_name 1">
            <div className="sheet-template__name">
              <Roll.Field name="character_name" />
            </div>
          </Roll.ConditionalIf>
          <div className="sheet-template__roll">
            <div className="sheet-template__header">
              <Roll.Field name="rollname" />
            </div>
            <div className="sheet-template__result">
              <Roll.ConditionalIf name="rollWasCrit() result">
                <div className="sheet-template__result__critical sheet-template__result__critical--success">
                  {'{'}
                </div>
              </Roll.ConditionalIf>
              <Roll.ConditionalIf name="rollWasFumble() result">
                <div className="sheet-template__result__critical sheet-template__result__critical--failure">
                  {'}'}
                </div>
              </Roll.ConditionalIf>
              <Roll.Field name="result" />
            </div>
          </div>
        </div>

        <Roll.ConditionalIf name="notes">
          <div className="sheet-template__notes">
            <strong>Notes:</strong>&nbsp;
            <Roll.Field name="notes" />
          </div>
        </Roll.ConditionalIf>
      </Roll.Template>

      <Roll.Template name="attack">
        <div className="sheet-template">
          <Roll.ConditionalIf name="rollTotal() show_name 1">
            <div className="sheet-template__name">
              <Roll.Field name="character_name" />
            </div>
          </Roll.ConditionalIf>
          <div className="sheet-template__roll">
            <div className="sheet-template__header">
              <Roll.Field name="rollname" />
            </div>
            <div className="sheet-template__result">
              <Roll.ConditionalIf name="rollWasCrit() result">
                <div className="sheet-template__result__critical sheet-template__result__critical--success">
                  {'{'}
                </div>
              </Roll.ConditionalIf>
              <Roll.ConditionalIf name="rollWasFumble() result">
                <div className="sheet-template__result__critical sheet-template__result__critical--failure">
                  {'}'}
                </div>
              </Roll.ConditionalIf>
              <Roll.Field name="result" />
            </div>
          </div>

          <div className="sheet-template__rows">
            <div className="sheet-template__row">
              <div className="sheet-template__label">Damage</div>
              <div className="sheet-template__field">
                <Roll.Field name="damage" />
              </div>
            </div>

            <Roll.ConditionalIf name="range">
              <div className="sheet-template__row">
                <div className="sheet-template__label">Range</div>
                <div className="sheet-template__field">
                  <Roll.Field name="range" />
                </div>
              </div>
            </Roll.ConditionalIf>
            <Roll.ConditionalIf name="charges">
              <div className="sheet-template__row">
                <div className="sheet-template__label">Charges</div>
                <div className="sheet-template__field">
                  <Roll.Field name="charges" />
                </div>
              </div>
            </Roll.ConditionalIf>
          </div>
        </div>

        <Roll.ConditionalIf name="notes">
          <div className="sheet-template__notes">
            <strong>Notes:</strong>&nbsp;
            <Roll.Field name="notes" />
          </div>
        </Roll.ConditionalIf>
      </Roll.Template>
    </React.Fragment>
  )
}

module.exports = RollTemplates
