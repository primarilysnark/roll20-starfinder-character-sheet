const React = require('react')

const SectionBlock = require('../section-block')

const ColumnLayout = require('../components/columns')
const Grid = require('../components/grid')
const skills = require('../../data/skills.js')

function CharacterScreen() {
  return (
    <React.Fragment>
      <Grid>
        <Grid.Header>
          <Grid.Label align="left" size="2fr">
            Class
          </Grid.Label>
          <Grid.Label align="left" size="1fr">
            Race
          </Grid.Label>
          <Grid.Label align="left" size="1fr">
            Theme
          </Grid.Label>
        </Grid.Header>

        <Grid.Row spaced>
          <Grid.Input align="left" attribute="attr_" disabled />
          <Grid.Input align="left" attribute="attr_race_name" disabled />
          <Grid.Input align="left" attribute="attr_theme" />
        </Grid.Row>
      </Grid>

      <Grid>
        <Grid.Header>
          <Grid.Label align="left" size="2fr">
            Size
          </Grid.Label>
          <Grid.Label align="left" size="1fr">
            Speed
          </Grid.Label>
          <Grid.Label align="left" size="1fr">
            Gender
          </Grid.Label>
          <Grid.Label align="left" size="4fr">
            Homeworld
          </Grid.Label>
        </Grid.Header>

        <Grid.Row spaced>
          <Grid.Input align="left" attribute="attr_race_size" disabled />
          <Grid.Input align="left" attribute="attr_race_speed" disabled />
          <Grid.Input align="left" attribute="attr_gender" />
          <Grid.Input align="left" attribute="attr_homeworld" />
        </Grid.Row>
      </Grid>

      <Grid>
        <Grid.Header>
          <Grid.Label align="left" size="2fr">
            Alignment
          </Grid.Label>
          <Grid.Label align="left" size="3fr">
            deity
          </Grid.Label>
          <Grid.Label align="left" size="3fr">
            Player
          </Grid.Label>
        </Grid.Header>

        <Grid.Row spaced>
          <Grid.Input
            attribute="attr_alignment"
            options={[
              'Lawful Good',
              'Lawful Neutral',
              'Lawful Evil',
              'Neutral Good',
              'True Neutral',
              'Neutral Evil',
              'Chaotic Good',
              'Chaotic Neutral',
              'Chaotic Evil',
            ]}
            type="select"
          />
          <Grid.Input align="left" attribute="attr_deity" />
          <Grid.Input align="left" attribute="attr_player" />
        </Grid.Row>
      </Grid>

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
                  <Grid.Abbreviation
                    abbr={abbreviation}
                    name={`roll_${field.toLowerCase()}_check`}
                    rollable={`1d20 + (0 @{${field.toLowerCase()}_mod})[MOD]`}
                    rollName={field}
                  >
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

          <SectionBlock title="Skills">
            <Grid compact tall>
              <Grid.Header>
                <Grid.Label size="16px">Class Skill</Grid.Label>
                <Grid.Spacer size="140px" />
                <Grid.Label size="1fr">Total</Grid.Label>
                <Grid.Spacer size="6px" />
                <Grid.Label size="1fr">Ranks</Grid.Label>
                <Grid.Spacer size="6px" />
                <Grid.Label size="1fr">Insight Bonus</Grid.Label>
                <Grid.Spacer size="6px" />
                <Grid.Label size="1fr">Ability Mod</Grid.Label>
                <Grid.Spacer size="6px" />
                <Grid.Label size="1fr">Misc</Grid.Label>
              </Grid.Header>

              {skills.map((skill) => {
                const attributeSkillName = skill.name.replace(/\s/g, '_')

                if (skill.name === 'profession') {
                  return null
                }

                return (
                  <Grid.Row key={skill.name}>
                    <Grid.Input
                      attribute={`attr_skills_${attributeSkillName}_class_skill`}
                      type="checkbox"
                    />
                    <Grid.Label>
                      {skill.name} ({skill.ability.substring(0, 3)})
                      {skill.trainedOnly ? '*' : ''}{' '}
                      {skill.armorCheckPenalty ? '¤' : ''}
                    </Grid.Label>
                    <Grid.Input
                      attribute={`attr_skills_${attributeSkillName}_mod`}
                      disabled
                    />
                    <Grid.Label>=</Grid.Label>
                    <Grid.Input
                      attribute={`attr_skills_${attributeSkillName}_ranks`}
                    />
                    <Grid.Label>+</Grid.Label>
                    <Grid.Input
                      attribute={`attr_skills_${attributeSkillName}_insight`}
                    />
                    <Grid.Label>+</Grid.Label>
                    <Grid.Input
                      attribute={`attr_${skill.ability}_mod`}
                      disabled
                    />
                    <Grid.Label>+</Grid.Label>
                    <Grid.Input attribute={`attr_skills_${skill.name}_misc`} />
                  </Grid.Row>
                )
              })}

              <Grid.FullWidth>
                <Grid.Label>
                  * Trained only skill &nbsp;&nbsp;&nbsp;&nbsp; ¤ Armor check
                  penalty applies
                </Grid.Label>
              </Grid.FullWidth>
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

          <SectionBlock title="Saving Throws">
            <Grid>
              <Grid.Header>
                <Grid.Spacer size="120px" />
                <Grid.Label size="1fr">Total</Grid.Label>
                <Grid.Spacer size="4px" />
                <Grid.Label size="1fr">Base</Grid.Label>
                <Grid.Spacer size="4px" />
                <Grid.Label size="1fr" span>
                  Ability Mod
                </Grid.Label>
                <Grid.Spacer size="4px" />
                <Grid.Label size="1fr">Misc</Grid.Label>
              </Grid.Header>

              <Grid.Row>
                <Grid.Abbreviation
                  abbr="Fortitude"
                  rollable="1d20 + @{fortitude_save_mod}"
                  name="roll_fortitude_save"
                >
                  Constitution
                </Grid.Abbreviation>
                <Grid.Input attribute="attr_fortitude_save_mod" disabled />
                <Grid.Label>=</Grid.Label>
                <Grid.Input attribute="attr_fortitude_save_base" disabled />
                <Grid.Label>+</Grid.Label>
                <Grid.Input attribute="attr_constitution_mod" disabled />
                <Grid.Label>+</Grid.Label>
                <Grid.Input attribute="attr_fortitude_save_misc" />
              </Grid.Row>

              <Grid.Row>
                <Grid.Abbreviation
                  abbr="Reflex"
                  rollable="1d20 + @{reflex_save_mod}"
                  name="roll_reflex_save"
                >
                  Dexterity
                </Grid.Abbreviation>
                <Grid.Input attribute="attr_reflex_save_mod" disabled />
                <Grid.Label>=</Grid.Label>
                <Grid.Input attribute="attr_reflex_save_base" disabled />
                <Grid.Label>+</Grid.Label>
                <Grid.Input attribute="attr_dexterity_mod" disabled />
                <Grid.Label>+</Grid.Label>
                <Grid.Input attribute="attr_reflex_save_misc" />
              </Grid.Row>

              <Grid.Row>
                <Grid.Abbreviation
                  abbr="Will"
                  rollable="1d20 + @{will_save_mod}"
                  name="roll_will_save"
                >
                  Wisdom
                </Grid.Abbreviation>
                <Grid.Input attribute="attr_will_save_mod" disabled />
                <Grid.Label>=</Grid.Label>
                <Grid.Input attribute="attr_will_save_base" disabled />
                <Grid.Label>+</Grid.Label>
                <Grid.Input attribute="attr_wisdom_mod" disabled />
                <Grid.Label>+</Grid.Label>
                <Grid.Input attribute="attr_will_save_misc" />
              </Grid.Row>
            </Grid>
          </SectionBlock>

          <SectionBlock title="Attack Bonuses">
            <Grid>
              <Grid.Header>
                <Grid.Spacer size="120px" />
                <Grid.Label size="1fr">Total</Grid.Label>
                <Grid.Spacer size="4px" />
                <Grid.Label size="1fr">BAB</Grid.Label>
                <Grid.Spacer size="4px" />
                <Grid.Label size="1fr" span>
                  Strength Mod
                </Grid.Label>
                <Grid.Spacer size="4px" />
                <Grid.Label size="1fr">Misc</Grid.Label>
              </Grid.Header>

              <Grid.Row>
                <Grid.BlockLabel>Melee Attack</Grid.BlockLabel>
                <Grid.Input attribute="attr_melee_attack_mod" disabled />
                <Grid.Label>=</Grid.Label>
                <Grid.Input attribute="attr_base_attack_bonus" disabled />
                <Grid.Label>+</Grid.Label>
                <Grid.Input attribute="attr_strength_mod" disabled />
                <Grid.Label>+</Grid.Label>
                <Grid.Input attribute="attr_melee_attack_misc" />
              </Grid.Row>

              <Grid.Separator />
            </Grid>

            <Grid>
              <Grid.Header>
                <Grid.Spacer size="120px" />
                <Grid.Label size="1fr">Total</Grid.Label>
                <Grid.Spacer size="4px" />
                <Grid.Label size="1fr">BAB</Grid.Label>
                <Grid.Spacer size="4px" />
                <Grid.Label size="1fr" span>
                  Dexterity Mod
                </Grid.Label>
                <Grid.Spacer size="4px" />
                <Grid.Label size="1fr">Misc</Grid.Label>
              </Grid.Header>

              <Grid.Row>
                <Grid.BlockLabel>Ranged Attack</Grid.BlockLabel>
                <Grid.Input attribute="attr_ranged_attack_mod" disabled />
                <Grid.Label>=</Grid.Label>
                <Grid.Input attribute="attr_base_attack_bonus" disabled />
                <Grid.Label>+</Grid.Label>
                <Grid.Input attribute="attr_dexterity_mod" disabled />
                <Grid.Label>+</Grid.Label>
                <Grid.Input attribute="attr_ranged_attack_misc" />
              </Grid.Row>

              <Grid.Separator />
            </Grid>

            <Grid>
              <Grid.Header>
                <Grid.Spacer size="120px" />
                <Grid.Label size="1fr">Total</Grid.Label>
                <Grid.Spacer size="4px" />
                <Grid.Label size="1fr">BAB</Grid.Label>
                <Grid.Spacer size="4px" />
                <Grid.Label size="1fr" span>
                  Strength Mod
                </Grid.Label>
                <Grid.Spacer size="4px" />
                <Grid.Label size="1fr">Misc</Grid.Label>
              </Grid.Header>

              <Grid.Row>
                <Grid.BlockLabel>Thrown Attack</Grid.BlockLabel>
                <Grid.Input attribute="attr_thrown_attack_mod" disabled />
                <Grid.Label>=</Grid.Label>
                <Grid.Input attribute="attr_base_attack_bonus" disabled />
                <Grid.Label>+</Grid.Label>
                <Grid.Input attribute="attr_strength_mod" disabled />
                <Grid.Label>+</Grid.Label>
                <Grid.Input attribute="attr_thrown_attack_misc" />
              </Grid.Row>
            </Grid>
          </SectionBlock>
        </ColumnLayout.Column>
      </ColumnLayout>
    </React.Fragment>
  )
}

module.exports = CharacterScreen
