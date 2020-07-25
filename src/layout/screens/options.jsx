const React = require('react')

const SectionBlock = require('../section-block')
const GridInput = require('../grid-input')

function OptionsScreen() {
  return (
    <div>
      <SectionBlock title="Class">
        <div className="options-class-grid">
          <div className="options-class-grid__row options-class-grid__row--heading">
            <div className="options-class-grid__label">Name</div>
            <div className="options-class-grid__label">Level</div>
            <div className="options-class-grid__label">SP</div>
            <div className="options-class-grid__label">HP</div>
            <div className="options-class-grid__label">BAB</div>
            <div className="options-class-grid__label">Fortitude</div>
            <div className="options-class-grid__label">Reflex</div>
            <div className="options-class-grid__label">Will</div>
            <div className="options-class-grid__label">Skills</div>
            <div className="options-class-grid__label">Key Ability</div>
            <div className="options-class-grid__label">Spells</div>
          </div>

          <fieldset className="repeating_classes">
            <div className="options-class-grid__row">
              <div className="options-class-grid__input">
                <GridInput attribute="attr_name" />
              </div>
              <div className="options-class-grid__input">
                <GridInput attribute="attr_level" />
              </div>
              <div className="options-class-grid__input">
                <GridInput attribute="attr_sp" />
              </div>
              <div className="options-class-grid__input">
                <GridInput attribute="attr_hp" />
              </div>
              <div className="options-class-grid__input">
                <select className="grid-input" name="attr_bab">
                  <option value="half">1/2</option>
                  <option value="three-quarter">3/4</option>
                  <option value="full">Full</option>
                </select>
              </div>
              <div className="options-class-grid__input">
                <select
                  className="grid-input"
                  name="attr_fortitude_save_progression"
                >
                  <option value="poor">Poor</option>
                  <option value="good">Good</option>
                </select>
              </div>
              <div className="options-class-grid__input">
                <select
                  className="grid-input"
                  name="attr_reflex_save_progression"
                >
                  <option value="poor">Poor</option>
                  <option value="good">Good</option>
                </select>
              </div>
              <div className="options-class-grid__input">
                <select
                  className="grid-input"
                  name="attr_will_save_progression"
                >
                  <option value="poor">Poor</option>
                  <option value="good">Good</option>
                </select>
              </div>
              <div className="options-class-grid__input">
                <GridInput attribute="attr_skills" />
              </div>
              <div className="options-class-grid__input">
                <select className="grid-input" name="attr_key_ability">
                  <option value="strength">Strength</option>
                  <option value="dexterity">Dexterity</option>
                  <option value="constitution">Constitution</option>
                  <option value="intelligence">Intelligence</option>
                  <option value="wisdom">Wisdom</option>
                  <option value="charisma">Charisma</option>
                </select>
              </div>
              <div className="options-class-grid__input">
                <input
                  className="grid-input"
                  name="attr_spells"
                  type="checkbox"
                />
              </div>
            </div>
          </fieldset>
        </div>
      </SectionBlock>
    </div>
  )
}

module.exports = OptionsScreen
