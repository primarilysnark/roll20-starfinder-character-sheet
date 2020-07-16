const React = require('react')

const Navigation = require('./navigation')

module.exports = function Example() {
  return (
    <div className="character-sheet">
      <Navigation />

      <div className="overview-grid">
        <div className="character-grid">
          <div className="character-grid__row character-grid__row--4-2-2">
            <div className="character-grid__field">
              <label>
                <span>Class</span>
                <input className="grid-input" disabled type="text" />
              </label>
            </div>

            <div className="character-grid__field">
              <label>
                <span>Race</span>
                <input className="grid-input" disabled type="text" />
              </label>
            </div>

            <div className="character-grid__field">
              <label>
                <span>Theme</span>
                <input className="grid-input" type="text" />
              </label>
            </div>
          </div>

          <div className="character-grid__row character-grid__row--2-1-1-4">
            <div className="character-grid__field">
              <label>
                <span>Size</span>
                <select className="grid-input" type="text">
                  <option>Small</option>
                </select>
              </label>
            </div>

            <div className="character-grid__field">
              <label>
                <span>Speed</span>
                <input className="grid-input" disabled type="text" />
              </label>
            </div>

            <div className="character-grid__field">
              <label>
                <span>Gender</span>
                <input className="grid-input" type="text" />
              </label>
            </div>

            <div className="character-grid__field">
              <label>
                <span>Homeworld</span>
                <input className="grid-input" type="text" />
              </label>
            </div>
          </div>

          <div className="character-grid__row character-grid__row--2-3-3">
            <div className="character-grid__field">
              <label>
                <span>Alignment</span>
                <select className="grid-input" type="text">
                  <option>Lawful Good</option>
                </select>
              </label>
            </div>

            <div className="character-grid__field">
              <label>
                <span>Deity</span>
                <input className="grid-input" type="text" />
              </label>
            </div>

            <div className="character-grid__field">
              <label>
                <span>Player</span>
                <input className="grid-input" disabled type="text" />
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="grid">
        <div className="grid__item--ability-scores section-block">
          <h2 className="section-block__heading">Ability Scores</h2>
          <div className="ability-score-grid">
            <div className="ability-score-grid__row ability-score-grid__row--heading">
              <div className="ability-score-grid__label">Score</div>
              <div className="ability-score-grid__label">Modifier</div>
              <div className="ability-score-grid__label">Penalty</div>
              <div className="ability-score-grid__label">Drain</div>
            </div>

            <div className="ability-score-grid__row">
              <div className="ability-score-grid__label">
                <div className="ability-score-grid__abbreviation">STR</div>
                Strength
              </div>
              <div className="ability-score-grid__input">
                <input
                  className="grid-input"
                  type="text"
                  name="attr_strength_base"
                  defaultValue="10"
                />
              </div>
              <div className="ability-score-grid__input">
                <span
                  className="grid-input grid-input--disabled"
                  name="attr_strength_mod"
                ></span>
              </div>
              <div className="ability-score-grid__input">
                <input
                  className="grid-input"
                  type="text"
                  name="attr_strength_penalty"
                />
              </div>
              <div className="ability-score-grid__input">
                <input
                  className="grid-input"
                  type="text"
                  name="attr_strength_drain"
                />
              </div>
            </div>

            <div className="ability-score-grid__row">
              <div className="ability-score-grid__label">
                <div className="ability-score-grid__abbreviation">DEX</div>
                Dexterity
              </div>
              <div className="ability-score-grid__input">
                <input
                  className="grid-input"
                  type="text"
                  name="attr_dexterity_base"
                />
              </div>
              <div className="ability-score-grid__input">
                <span
                  className="grid-input grid-input--disabled"
                  name="attr_dexterity_mod"
                ></span>
              </div>
              <div className="ability-score-grid__input">
                <input
                  className="grid-input"
                  type="text"
                  name="attr_dexterity_penalty"
                />
              </div>
              <div className="ability-score-grid__input">
                <input
                  className="grid-input"
                  type="text"
                  name="attr_dexterity_drain"
                />
              </div>
            </div>

            <div className="ability-score-grid__row">
              <div className="ability-score-grid__label">
                <div className="ability-score-grid__abbreviation">CON</div>
                Constitution
              </div>
              <div className="ability-score-grid__input">
                <input
                  className="grid-input"
                  type="text"
                  name="attr_constitution_base"
                />
              </div>
              <div className="ability-score-grid__input">
                <span
                  className="grid-input grid-input--disabled"
                  name="attr_constitution_mod"
                ></span>
              </div>
              <div className="ability-score-grid__input">
                <input
                  className="grid-input"
                  type="text"
                  name="attr_constitution_penalty"
                />
              </div>
              <div className="ability-score-grid__input">
                <input
                  className="grid-input"
                  type="text"
                  name="attr_constitution_drain"
                />
              </div>
            </div>

            <div className="ability-score-grid__row">
              <div className="ability-score-grid__label">
                <div className="ability-score-grid__abbreviation">INT</div>
                Intelligence
              </div>
              <div className="ability-score-grid__input">
                <input
                  className="grid-input"
                  type="text"
                  name="attr_intelligence_base"
                />
              </div>
              <div className="ability-score-grid__input">
                <span
                  className="grid-input grid-input--disabled"
                  name="attr_intelligence_mod"
                ></span>
              </div>
              <div className="ability-score-grid__input">
                <input
                  className="grid-input"
                  type="text"
                  name="attr_intelligence_penalty"
                />
              </div>
              <div className="ability-score-grid__input">
                <input
                  className="grid-input"
                  type="text"
                  name="attr_intelligence_drain"
                />
              </div>
            </div>

            <div className="ability-score-grid__row">
              <div className="ability-score-grid__label">
                <div className="ability-score-grid__abbreviation">WIS</div>
                Wisdom
              </div>
              <div className="ability-score-grid__input">
                <input
                  className="grid-input"
                  type="text"
                  name="attr_wisdom_base"
                />
              </div>
              <div className="ability-score-grid__input">
                <span
                  className="grid-input grid-input--disabled"
                  name="attr_wisdom_mod"
                ></span>
              </div>
              <div className="ability-score-grid__input">
                <input
                  className="grid-input"
                  type="text"
                  name="attr_wisdom_penalty"
                />
              </div>
              <div className="ability-score-grid__input">
                <input
                  className="grid-input"
                  type="text"
                  name="attr_wisdom_drain"
                />
              </div>
            </div>

            <div className="ability-score-grid__row">
              <div className="ability-score-grid__label">
                <div className="ability-score-grid__abbreviation">CHA</div>
                Charisma
              </div>
              <div className="ability-score-grid__input">
                <input
                  className="grid-input"
                  type="text"
                  name="attr_charisma_base"
                />
              </div>
              <div className="ability-score-grid__input">
                <span
                  className="grid-input grid-input--disabled"
                  name="attr_charisma_mod"
                ></span>
              </div>
              <div className="ability-score-grid__input">
                <input
                  className="grid-input"
                  type="text"
                  name="attr_charisma_penalty"
                />
              </div>
              <div className="ability-score-grid__input">
                <input
                  className="grid-input"
                  type="text"
                  name="attr_charisma_drain"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid__item--skills section-block">
          <h2 className="section-block__heading">Skills</h2>
          <div className="skill-grid">
            <div className="skill-grid__row skill-grid__row--heading">
              <div className="skill-grid__label skill-grid__label--class-skill">
                Class Skill
              </div>
              <div className="skill-grid__label skill-grid__label--total">
                Total
              </div>
              <div className="skill-grid__label skill-grid__label--ranks">
                Ranks
              </div>
              <div className="skill-grid__label skill-grid__label--class-bonus">
                Insight Bonus
              </div>
              <div className="skill-grid__label skill-grid__label--ability-mod">
                Ability Mod
              </div>
              <div className="skill-grid__label skill-grid__label--misc">
                Misc
              </div>
            </div>

            <div className="skill-grid__row">
              <div className="skill-grid__checkbox">
                <input className="grid-check" type="checkbox" />
              </div>
              <div className="skill-grid__label">Acrobatics (DEX) ¤</div>
              <div className="skill-grid__input">
                <input className="grid-input" disabled type="text" />
              </div>
              <div className="skill-grid__operation">=</div>
              <div className="skill-grid__input">
                <input className="grid-input" type="text" />
              </div>
              <div className="skill-grid__operation">+</div>
              <div className="skill-grid__input">
                <input className="grid-input" type="text" />
              </div>
              <div className="skill-grid__operation">+</div>
              <div className="skill-grid__input">
                <input className="grid-input" disabled type="text" />
              </div>
              <div className="skill-grid__operation">+</div>
              <div className="skill-grid__input">
                <input className="grid-input" type="text" />
              </div>
            </div>

            <div className="skill-grid__row">
              <div className="skill-grid__checkbox">
                <input className="grid-check" type="checkbox" />
              </div>
              <div className="skill-grid__label">Bluff (CHA)</div>
              <div className="skill-grid__input">
                <input className="grid-input" disabled type="text" />
              </div>
              <div className="skill-grid__operation">=</div>
              <div className="skill-grid__input">
                <input className="grid-input" type="text" />
              </div>
              <div className="skill-grid__operation">+</div>
              <div className="skill-grid__input">
                <input className="grid-input" type="text" />
              </div>
              <div className="skill-grid__operation">+</div>
              <div className="skill-grid__input">
                <input className="grid-input" disabled type="text" />
              </div>
              <div className="skill-grid__operation">+</div>
              <div className="skill-grid__input">
                <input className="grid-input" type="text" />
              </div>
            </div>

            <div className="skill-grid__row">
              <div className="skill-grid__checkbox">
                <input className="grid-check" type="checkbox" />
              </div>
              <div className="skill-grid__label">Physical Science (INT)*</div>
              <div className="skill-grid__input">
                <input className="grid-input" disabled type="text" />
              </div>
              <div className="skill-grid__operation">=</div>
              <div className="skill-grid__input">
                <input className="grid-input" type="text" />
              </div>
              <div className="skill-grid__operation">+</div>
              <div className="skill-grid__input">
                <input className="grid-input" type="text" />
              </div>
              <div className="skill-grid__operation">+</div>
              <div className="skill-grid__input">
                <input className="grid-input" disabled type="text" />
              </div>
              <div className="skill-grid__operation">+</div>
              <div className="skill-grid__input">
                <input className="grid-input" type="text" />
              </div>
            </div>

            <div className="skill-grid__row">
              <div className="skill-grid__checkbox">
                <input className="grid-check" type="checkbox" />
              </div>
              <div className="skill-grid__label">Sleight of Hand (DEX)* ¤</div>
              <div className="skill-grid__input">
                <input className="grid-input" disabled type="text" />
              </div>
              <div className="skill-grid__operation">=</div>
              <div className="skill-grid__input">
                <input className="grid-input" type="text" />
              </div>
              <div className="skill-grid__operation">+</div>
              <div className="skill-grid__input">
                <input className="grid-input" type="text" />
              </div>
              <div className="skill-grid__operation">+</div>
              <div className="skill-grid__input">
                <input className="grid-input" disabled type="text" />
              </div>
              <div className="skill-grid__operation">+</div>
              <div className="skill-grid__input">
                <input className="grid-input" type="text" />
              </div>
            </div>

            <div className="skill-grid__notes">
              <div className="skill-grid__label">
                * Trained only skill <span className="spacer"></span> ¤ Armor
                check penalty applies
              </div>
            </div>
          </div>
        </div>

        <div className="grid__item--initiative section-block section-block--stand-alone">
          <h2 className="section-block__heading">Initiative</h2>
          <div className="section-block__grid">
            <div className="section-block__row section-block__row--heading">
              <div className="section-block__label section-block__label--total">
                Total
              </div>
              <div className="section-block__label section-block__label--dexterity-mod">
                Dex Mod
              </div>
              <div className="section-block__label section-block__label--misc">
                Misc
              </div>
            </div>

            <div className="section-block__row">
              <div className="section-block__input">
                <input className="grid-input" disabled type="text" />
              </div>
              <div className="section-block__operation">=</div>
              <div className="section-block__input">
                <input className="grid-input" disabled type="text" />
              </div>
              <div className="section-block__operation">+</div>
              <div className="section-block__input">
                <input className="grid-input" type="text" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid__item--health-and-resolve section-block">
          <h2 className="section-block__heading">Health and Resolve</h2>
          <div className="health-and-resolve-grid">
            <div className="health-and-resolve-grid__row health-and-resolve-grid__row--heading">
              <div className="health-and-resolve-grid__label">Current</div>
              <div className="health-and-resolve-grid__label">Total</div>
            </div>

            <div className="health-and-resolve-grid__row">
              <div className="health-and-resolve-grid__abbreviation">SP</div>
              <div className="health-and-resolve-grid__label">Stamina</div>
              <div className="health-and-resolve-grid__input">
                <input className="grid-input" type="text" />
              </div>
              <div className="health-and-resolve-grid__input">
                <input className="grid-input" disabled type="text" />
              </div>
            </div>

            <div className="health-and-resolve-grid__row">
              <div className="health-and-resolve-grid__abbreviation">HP</div>
              <div className="health-and-resolve-grid__label">Health</div>
              <div className="health-and-resolve-grid__input">
                <input className="grid-input" type="text" />
              </div>
              <div className="health-and-resolve-grid__input">
                <input className="grid-input" disabled type="text" />
              </div>
            </div>

            <div className="health-and-resolve-grid__row">
              <div className="health-and-resolve-grid__abbreviation">RP</div>
              <div className="health-and-resolve-grid__label">Resolve</div>
              <div className="health-and-resolve-grid__input">
                <input className="grid-input" type="text" />
              </div>
              <div className="health-and-resolve-grid__input">
                <input className="grid-input" disabled type="text" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid__item--armor-class section-block">
          <h2 className="section-block__heading">Armor Class</h2>
          <div className="armor-class-grid">
            <div className="armor-class-grid__row armor-class-grid__row--heading">
              <div className="armor-class-grid__label armor-class-grid__label--total">
                Total
              </div>
              <div className="armor-class-grid__label armor-class-grid__label--armor-bonus">
                Armor
              </div>
              <div className="armor-class-grid__label armor-class-grid__label--dex-mod">
                Dex Mod
              </div>
              <div className="armor-class-grid__label armor-class-grid__label--misc-mod">
                Misc
              </div>
            </div>

            <div className="armor-class-grid__row">
              <div className="armor-class-grid__abbreviation">EAC</div>
              <div className="armor-class-grid__label">Energy Armor Class</div>
              <div className="armor-class-grid__input">
                <input className="grid-input" disabled type="text" />
              </div>
              <div className="armor-class-grid__operation">=</div>
              <div className="armor-class-grid__placeholder">10</div>
              <div className="armor-class-grid__operation">+</div>
              <div className="armor-class-grid__input">
                <input className="grid-input" disabled type="text" />
              </div>
              <div className="armor-class-grid__operation">+</div>
              <div className="armor-class-grid__input">
                <input className="grid-input" disabled type="text" />
              </div>
              <div className="armor-class-grid__operation">+</div>
              <div className="armor-class-grid__input">
                <input className="grid-input" type="text" />
              </div>
            </div>

            <div className="armor-class-grid__row">
              <div className="armor-class-grid__abbreviation">KAC</div>
              <div className="armor-class-grid__label">Kinetic Armor Class</div>
              <div className="armor-class-grid__input">
                <input className="grid-input" disabled type="text" />
              </div>
              <div className="armor-class-grid__operation">=</div>
              <div className="armor-class-grid__placeholder">10</div>
              <div className="armor-class-grid__operation">+</div>
              <div className="armor-class-grid__input">
                <input className="grid-input" disabled type="text" />
              </div>
              <div className="armor-class-grid__operation">+</div>
              <div className="armor-class-grid__input">
                <input className="grid-input" disabled type="text" />
              </div>
              <div className="armor-class-grid__operation">+</div>
              <div className="armor-class-grid__input">
                <input className="grid-input" type="text" />
              </div>
            </div>

            <div className="armor-class-grid__row armor-class-grid__row--spacer">
              <div className="armor-class-grid__combined-label">
                AC vs. Combat Maneuvers
              </div>
              <div className="armor-class-grid__input">
                <input className="grid-input" disabled type="text" />
              </div>
              <div className="armor-class-grid__operation">=</div>
              <div className="armor-class-grid__placeholder">8</div>
              <div className="armor-class-grid__operation">+</div>
              <div className="armor-class-grid__input">
                <input
                  className="grid-input"
                  disabled
                  type="text"
                  defaultValue="KAC"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid__item--saving-throws section-block">
          <h2 className="section-block__heading">Saving Throws</h2>
          <div className="saving-throws-grid">
            <div className="saving-throws-grid__row saving-throws-grid__row--heading">
              <div className="saving-throws-grid__label saving-throws-grid__label--total">
                Total
              </div>
              <div className="saving-throws-grid__label saving-throws-grid__label--base-save">
                Base
              </div>
              <div className="saving-throws-grid__label saving-throws-grid__label--ability-mod">
                Ability Mod
              </div>
              <div className="saving-throws-grid__label saving-throws-grid__label--misc">
                Misc
              </div>
            </div>

            <div className="saving-throws-grid__row">
              <div className="saving-throws-grid__label">
                <div className="saving-throws-grid__abbreviation">
                  Fortitude
                </div>
                Constitution
              </div>
              <div className="saving-throws-grid__input">
                <input className="grid-input" disabled type="text" />
              </div>
              <div className="saving-throws-grid__operation">=</div>
              <div className="saving-throws-grid__input">
                <input className="grid-input" disabled type="text" />
              </div>
              <div className="saving-throws-grid__operation">+</div>
              <div className="saving-throws-grid__input">
                <input className="grid-input" disabled type="text" />
              </div>
              <div className="saving-throws-grid__operation">+</div>
              <div className="saving-throws-grid__input">
                <input className="grid-input" type="text" />
              </div>
            </div>

            <div className="saving-throws-grid__row">
              <div className="saving-throws-grid__label">
                <div className="saving-throws-grid__abbreviation">Reflex</div>
                Dexterity
              </div>
              <div className="saving-throws-grid__input">
                <input className="grid-input" disabled type="text" />
              </div>
              <div className="saving-throws-grid__operation">=</div>
              <div className="saving-throws-grid__input">
                <input className="grid-input" disabled type="text" />
              </div>
              <div className="saving-throws-grid__operation">+</div>
              <div className="saving-throws-grid__input">
                <input className="grid-input" disabled type="text" />
              </div>
              <div className="saving-throws-grid__operation">+</div>
              <div className="saving-throws-grid__input">
                <input className="grid-input" type="text" />
              </div>
            </div>

            <div className="saving-throws-grid__row">
              <div className="saving-throws-grid__label">
                <div className="saving-throws-grid__abbreviation">Will</div>
                Wisdom
              </div>
              <div className="saving-throws-grid__input">
                <input className="grid-input" disabled type="text" />
              </div>
              <div className="saving-throws-grid__operation">=</div>
              <div className="saving-throws-grid__input">
                <input className="grid-input" disabled type="text" />
              </div>
              <div className="saving-throws-grid__operation">+</div>
              <div className="saving-throws-grid__input">
                <input className="grid-input" disabled type="text" />
              </div>
              <div className="saving-throws-grid__operation">+</div>
              <div className="saving-throws-grid__input">
                <input className="grid-input" type="text" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid__item--attack-bonuses section-block">
          <h2 className="section-block__heading">Attack Bonuses</h2>
          <div className="attack-bonuses-grid">
            <div className="attack-bonuses-grid__row attack-bonuses-grid__row--heading">
              <div className="attack-bonuses-grid__label attack-bonuses-grid__label--total">
                Total
              </div>
              <div className="attack-bonuses-grid__label attack-bonuses-grid__label--base-save">
                BAB
              </div>
              <div className="attack-bonuses-grid__label attack-bonuses-grid__label--ability-mod">
                Strength Mod
              </div>
              <div className="attack-bonuses-grid__label attack-bonuses-grid__label--misc">
                Misc
              </div>
            </div>

            <div className="attack-bonuses-grid__row">
              <div className="attack-bonuses-grid__label">Melee Attack</div>
              <div className="attack-bonuses-grid__input">
                <input className="grid-input" disabled type="text" />
              </div>
              <div className="attack-bonuses-grid__operation">=</div>
              <div className="attack-bonuses-grid__input">
                <input className="grid-input" disabled type="text" />
              </div>
              <div className="attack-bonuses-grid__operation">+</div>
              <div className="attack-bonuses-grid__input">
                <input className="grid-input" disabled type="text" />
              </div>
              <div className="attack-bonuses-grid__operation">+</div>
              <div className="attack-bonuses-grid__input">
                <input className="grid-input" type="text" />
              </div>
            </div>

            <div className="attack-bonuses-grid__row attack-bonuses-grid__row--heading">
              <div className="attack-bonuses-grid__label attack-bonuses-grid__label--total">
                Total
              </div>
              <div className="attack-bonuses-grid__label attack-bonuses-grid__label--base-save">
                BAB
              </div>
              <div className="attack-bonuses-grid__label attack-bonuses-grid__label--ability-mod">
                Dexterity Mod
              </div>
              <div className="attack-bonuses-grid__label attack-bonuses-grid__label--misc">
                Misc
              </div>
            </div>

            <div className="attack-bonuses-grid__row">
              <div className="attack-bonuses-grid__label">Ranged Attack</div>
              <div className="attack-bonuses-grid__input">
                <input className="grid-input" disabled type="text" />
              </div>
              <div className="attack-bonuses-grid__operation">=</div>
              <div className="attack-bonuses-grid__input">
                <input className="grid-input" disabled type="text" />
              </div>
              <div className="attack-bonuses-grid__operation">+</div>
              <div className="attack-bonuses-grid__input">
                <input className="grid-input" disabled type="text" />
              </div>
              <div className="attack-bonuses-grid__operation">+</div>
              <div className="attack-bonuses-grid__input">
                <input className="grid-input" type="text" />
              </div>
            </div>

            <div className="attack-bonuses-grid__row attack-bonuses-grid__row--heading">
              <div className="attack-bonuses-grid__label attack-bonuses-grid__label--total">
                Total
              </div>
              <div className="attack-bonuses-grid__label attack-bonuses-grid__label--base-save">
                BAB
              </div>
              <div className="attack-bonuses-grid__label attack-bonuses-grid__label--ability-mod">
                Strength Mod
              </div>
              <div className="attack-bonuses-grid__label attack-bonuses-grid__label--misc">
                Misc
              </div>
            </div>

            <div className="attack-bonuses-grid__row">
              <div className="attack-bonuses-grid__label">Thrown Attack</div>
              <div className="attack-bonuses-grid__input">
                <input className="grid-input" disabled type="text" />
              </div>
              <div className="attack-bonuses-grid__operation">=</div>
              <div className="attack-bonuses-grid__input">
                <input className="grid-input" disabled type="text" />
              </div>
              <div className="attack-bonuses-grid__operation">+</div>
              <div className="attack-bonuses-grid__input">
                <input className="grid-input" disabled type="text" />
              </div>
              <div className="attack-bonuses-grid__operation">+</div>
              <div className="attack-bonuses-grid__input">
                <input className="grid-input" type="text" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
