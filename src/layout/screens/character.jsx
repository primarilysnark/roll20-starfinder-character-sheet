const React = require('react')

const GridInput = require('../grid-input')
const SectionBlock = require('../section-block')

const ColumnLayout = require('../components/columns')
const Grid = require('../components/grid')

function CharacterScreen() {
  return (
    <React.Fragment>
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

      <ColumnLayout>
        <ColumnLayout.Column size="1fr">
          <SectionBlock title="Ability Scores">
            <Grid>
              <Grid.Header>
                <Grid.Spacer size="80px" />
                <Grid.Label size="2fr">Score</Grid.Label>
                <Grid.Label size="1fr">Modifier</Grid.Label>
                <Grid.Label size="1fr">Penalty</Grid.Label>
                <Grid.Label size="1fr">Drain</Grid.Label>
              </Grid.Header>

              {[
                ['STR', 'Strength'],
                ['DEX', 'Dexterity'],
                ['CON', 'Constitution'],
                ['INT', 'Intelligence'],
                ['WIS', 'Wisdom'],
                ['CHA', 'Charisma'],
              ].map(([abbreviation, field]) => (
                <Grid.Row key={abbreviation}>
                  <Grid.Abbreviation abbr={abbreviation}>
                    {field}
                  </Grid.Abbreviation>
                  <Grid.Input
                    attribute={`attr_${field.toLowerCase()}_base`}
                    overlay={`attr_${field.toLowerCase()}_adjusted`}
                    defaultValue="10"
                  />
                  <Grid.Input
                    attribute={`attr_${field.toLowerCase()}_mod`}
                    disabled
                  />
                  <Grid.Input
                    attribute={`attr_${field.toLowerCase()}_penalty`}
                  />
                  <Grid.Input attribute={`attr_${field.toLowerCase()}_drain`} />
                </Grid.Row>
              ))}
            </Grid>
          </SectionBlock>
        </ColumnLayout.Column>
        <ColumnLayout.Column size="1fr">
          <SectionBlock standalone title="Initiative">
            <Grid compact>
              <Grid.Header>
                <Grid.Label size="1fr">Total</Grid.Label>
                <Grid.Spacer size="6px" />
                <Grid.Label size="1fr">Dex Mod</Grid.Label>
                <Grid.Spacer size="6px" />
                <Grid.Label size="1fr">Misc</Grid.Label>
              </Grid.Header>

              <Grid.Row>
                <Grid.Input attribute="attr_initiative_bonus" disabled />
                <Grid.Label align="center">=</Grid.Label>
                <Grid.Input attribute="attr_dexterity_mod" disabled />
                <Grid.Label align="center">+</Grid.Label>
                <Grid.Input attribute="attr_initiative_misc" />
              </Grid.Row>
            </Grid>
          </SectionBlock>

          <SectionBlock title="Health and Resolve">
            <Grid>
              <Grid.Header>
                <Grid.Spacer size="45px" />
                <Grid.Spacer size="65px" />
                <Grid.Label size="1fr">Current</Grid.Label>
                <Grid.Label size="1fr">Total</Grid.Label>
              </Grid.Header>

              <Grid.Row>
                <Grid.BlockLabel>SP</Grid.BlockLabel>
                <Grid.Label>Stamina</Grid.Label>
                <Grid.Input attribute="attr_stamina_current" />
                <Grid.Input attribute="attr_stamina_total" disabled />
              </Grid.Row>

              <Grid.Row>
                <Grid.BlockLabel>HP</Grid.BlockLabel>
                <Grid.Label>Health</Grid.Label>
                <Grid.Input attribute="attr_health_current" />
                <Grid.Input attribute="attr_health_total" disabled />
              </Grid.Row>

              <Grid.Row>
                <Grid.BlockLabel>RP</Grid.BlockLabel>
                <Grid.Label>Resolve</Grid.Label>
                <Grid.Input attribute="attr_resolve_current" />
                <Grid.Input attribute="attr_resolve_total" disabled />
              </Grid.Row>
            </Grid>
          </SectionBlock>

          <SectionBlock title="Armor Class">
            <Grid compact>
              <Grid.Header>
                <Grid.Spacer size="45px" />
                <Grid.Spacer size="75px" />
                <Grid.Label size="1fr">Total</Grid.Label>
                <Grid.Spacer size="8px" />
                <Grid.Spacer size="16px" />
                <Grid.Spacer size="8px" />
                <Grid.Label size="1fr">Armor</Grid.Label>
                <Grid.Spacer size="8px" />
                <Grid.Label size="1fr">Dex Mod</Grid.Label>
                <Grid.Spacer size="8px" />
                <Grid.Label size="1fr">Misc</Grid.Label>
              </Grid.Header>

              <Grid.Row>
                <Grid.BlockLabel>EAC</Grid.BlockLabel>
                <Grid.Label>Energy Armor Class</Grid.Label>
                <Grid.Input />
                <Grid.Label>=</Grid.Label>
                <Grid.Label align="center">10</Grid.Label>
                <Grid.Label>+</Grid.Label>
                <Grid.Input disabled />
                <Grid.Label>+</Grid.Label>
                <Grid.Input disabled />
                <Grid.Label>+</Grid.Label>
                <Grid.Input />
              </Grid.Row>

              <Grid.Row>
                <Grid.BlockLabel>KAC</Grid.BlockLabel>
                <Grid.Label>Kinetic Armor Class</Grid.Label>
                <Grid.Input />
                <Grid.Label>=</Grid.Label>
                <Grid.Label align="center">10</Grid.Label>
                <Grid.Label>+</Grid.Label>
                <Grid.Input disabled />
                <Grid.Label>+</Grid.Label>
                <Grid.Input disabled />
                <Grid.Label>+</Grid.Label>
                <Grid.Input />
              </Grid.Row>

              <Grid.Separator />
            </Grid>

            <Grid compact>
              <Grid.Header>
                <Grid.Spacer size="125px" />
                <Grid.Spacer size="1fr" />
                <Grid.Spacer size="8px" />
                <Grid.Spacer size="16px" />
                <Grid.Spacer size="8px" />
                <Grid.Spacer size="1fr" />
                <Grid.Spacer size="8px" />
                <Grid.Spacer size="1fr" />
                <Grid.Spacer size="8px" />
                <Grid.Spacer size="1fr" />
              </Grid.Header>

              <Grid.Row>
                <Grid.Label>AC vs. Combat Maneuvers</Grid.Label>
                <Grid.Input />
                <Grid.Label>=</Grid.Label>
                <Grid.Label align="center">8</Grid.Label>
                <Grid.Label>+</Grid.Label>
                <Grid.Input defaultValue="KAC" disabled />
              </Grid.Row>
            </Grid>
          </SectionBlock>
        </ColumnLayout.Column>
      </ColumnLayout>

      <div className="grid">
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
                <GridInput attribute="attr_fortitude_save_mod" disabled />
              </div>
              <div className="saving-throws-grid__operation">=</div>
              <div className="saving-throws-grid__input">
                <GridInput attribute="attr_fortitude_save_base" disabled />
              </div>
              <div className="saving-throws-grid__operation">+</div>
              <div className="saving-throws-grid__input">
                <GridInput attribute="attr_constitution_mod" disabled />
              </div>
              <div className="saving-throws-grid__operation">+</div>
              <div className="saving-throws-grid__input">
                <GridInput attribute="attr_fortitude_save_misc" />
              </div>
            </div>

            <div className="saving-throws-grid__row">
              <div className="saving-throws-grid__label">
                <div className="saving-throws-grid__abbreviation">Reflex</div>
                Dexterity
              </div>
              <div className="saving-throws-grid__input">
                <GridInput attribute="attr_reflex_save_mod" disabled />
              </div>
              <div className="saving-throws-grid__operation">=</div>
              <div className="saving-throws-grid__input">
                <GridInput attribute="attr_reflex_save_base" disabled />
              </div>
              <div className="saving-throws-grid__operation">+</div>
              <div className="saving-throws-grid__input">
                <GridInput attribute="attr_dexterity_mod" disabled />
              </div>
              <div className="saving-throws-grid__operation">+</div>
              <div className="saving-throws-grid__input">
                <GridInput attribute="attr_reflex_save_misc" />
              </div>
            </div>

            <div className="saving-throws-grid__row">
              <div className="saving-throws-grid__label">
                <div className="saving-throws-grid__abbreviation">Will</div>
                Wisdom
              </div>
              <div className="saving-throws-grid__input">
                <GridInput attribute="attr_will_save_mod" disabled />
              </div>
              <div className="saving-throws-grid__operation">=</div>
              <div className="saving-throws-grid__input">
                <GridInput attribute="attr_will_save_base" disabled />
              </div>
              <div className="saving-throws-grid__operation">+</div>
              <div className="saving-throws-grid__input">
                <GridInput attribute="attr_wisdom_mod" disabled />
              </div>
              <div className="saving-throws-grid__operation">+</div>
              <div className="saving-throws-grid__input">
                <GridInput attribute="attr_will_save_misc" />
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
                <GridInput attribute="attr_melee_attack_mod" disabled />
              </div>
              <div className="attack-bonuses-grid__operation">=</div>
              <div className="attack-bonuses-grid__input">
                <GridInput attribute="attr_base_attack_bonus" disabled />
              </div>
              <div className="attack-bonuses-grid__operation">+</div>
              <div className="attack-bonuses-grid__input">
                <GridInput attribute="attr_strength_mod" disabled />
              </div>
              <div className="attack-bonuses-grid__operation">+</div>
              <div className="attack-bonuses-grid__input">
                <GridInput
                  attribute="attr_melee_attack_misc"
                  defaultValue="0"
                />
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
                <GridInput attribute="attr_ranged_attack_mod" disabled />
              </div>
              <div className="attack-bonuses-grid__operation">=</div>
              <div className="attack-bonuses-grid__input">
                <GridInput attribute="attr_base_attack_bonus" disabled />
              </div>
              <div className="attack-bonuses-grid__operation">+</div>
              <div className="attack-bonuses-grid__input">
                <GridInput attribute="attr_dexterity_mod" disabled />
              </div>
              <div className="attack-bonuses-grid__operation">+</div>
              <div className="attack-bonuses-grid__input">
                <GridInput
                  attribute="attr_ranged_attack_misc"
                  defaultValue="0"
                />
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
                <GridInput attribute="attr_thrown_attack_mod" disabled />
              </div>
              <div className="attack-bonuses-grid__operation">=</div>
              <div className="attack-bonuses-grid__input">
                <GridInput attribute="attr_base_attack_bonus" disabled />
              </div>
              <div className="attack-bonuses-grid__operation">+</div>
              <div className="attack-bonuses-grid__input">
                <GridInput attribute="attr_strength_mod" disabled />
              </div>
              <div className="attack-bonuses-grid__operation">+</div>
              <div className="attack-bonuses-grid__input">
                <GridInput
                  attribute="attr_thrown_attack_misc"
                  defaultValue="0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

module.exports = CharacterScreen
