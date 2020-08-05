const React = require('react')

const ColumnLayout = require('../components/columns')
const Grid = require('../components/grid')
const SectionBlock = require('../section-block')

const { getAbbreviationForAttribute } = require('../utils/attributes')
const skills = require('../data/skills')

function OptionsScreen() {
  const filteredSkills = skills.filter((skill) => skill.name !== 'profession')

  return (
    <div>
      <SectionBlock title="Class">
        <Grid>
          <Grid.Header>
            <Grid.Label align="left" size="7fr">
              Name
            </Grid.Label>
            <Grid.Label size="2fr">Level</Grid.Label>
            <Grid.Label size="2fr">SP</Grid.Label>
            <Grid.Label size="2fr">HP</Grid.Label>
            <Grid.Label size="3fr">BAB</Grid.Label>
            <Grid.Label size="4fr">Fortitude</Grid.Label>
            <Grid.Label size="4fr">Reflex</Grid.Label>
            <Grid.Label size="4fr">Will</Grid.Label>
            <Grid.Label size="2fr">Skills</Grid.Label>
            <Grid.Label size="6fr">Key Ability</Grid.Label>
            <Grid.Label size="3rem">Spells</Grid.Label>
          </Grid.Header>

          <fieldset className="repeating_classes">
            <Grid.Row>
              <Grid.Input align="left" attribute="attr_name" />
              <Grid.Input attribute="attr_level" />
              <Grid.Input attribute="attr_sp" />
              <Grid.Input attribute="attr_hp" />
              <Grid.Input
                attribute="attr_bab"
                options={[
                  ['half', '1/2'],
                  ['three-quarter', '3/4'],
                  ['full', 'Full'],
                ]}
                type="select"
              />
              <Grid.Input
                attribute="attr_fortitude_save_progression"
                options={[
                  ['poor', 'Poor'],
                  ['good', 'Good'],
                ]}
                type="select"
              />
              <Grid.Input
                attribute="attr_reflex_save_progression"
                options={[
                  ['poor', 'Poor'],
                  ['good', 'Good'],
                ]}
                type="select"
              />
              <Grid.Input
                attribute="attr_will_save_progression"
                options={[
                  ['poor', 'Poor'],
                  ['good', 'Good'],
                ]}
                type="select"
              />
              <Grid.Input attribute="attr_skills" />
              <Grid.Input
                attribute="attr_key_ability"
                options={[
                  ['strength', 'Strength'],
                  ['dexterity', 'Dexterity'],
                  ['constitution', 'Constitution'],
                  ['intelligence', 'Intelligence'],
                  ['wisdom', 'Wisdom'],
                  ['charisma', 'Charisma'],
                ]}
                type="select"
              />
              <Grid.Input attribute="attr_spells" type="checkbox" />
            </Grid.Row>
          </fieldset>
        </Grid>
      </SectionBlock>

      <ColumnLayout>
        <ColumnLayout.Column size="2fr">
          <SectionBlock title="Race">
            <Grid>
              <Grid.Header>
                <Grid.Label align="left" size="4fr">
                  Name
                </Grid.Label>
                <Grid.Label size="4fr">Type</Grid.Label>
                <Grid.Label size="4fr">Subtypes</Grid.Label>
                <Grid.Label size="5fr">Size</Grid.Label>
                <Grid.Label size="2fr">HP</Grid.Label>
                <Grid.Label size="3fr">Speed</Grid.Label>
              </Grid.Header>

              <Grid.Row>
                <Grid.Input align="left" attribute="attr_race_name" />
                <Grid.Input attribute="attr_race_type" />
                <Grid.Input attribute="attr_race_subtypes" />
                <Grid.Input
                  attribute="attr_race_size"
                  options={[
                    ['fine', 'Fine'],
                    ['diminutive', 'Diminutive'],
                    ['tiny', 'Tiny'],
                    ['small', 'Small'],
                    ['medium', 'Medium'],
                    ['large', 'Large'],
                    ['huge', 'Huge'],
                    ['gargantuan', 'Gargantuan'],
                    ['colossal', 'Colossal'],
                  ]}
                  defaultValue="medium"
                  type="select"
                />
                <Grid.Input attribute="attr_race_hp" />
                <Grid.Input attribute="attr_race_speed" />
              </Grid.Row>
            </Grid>
          </SectionBlock>

          <SectionBlock title="Rolls">
            <Grid>
              <Grid.Header>
                <Grid.Spacer size="2rem" />
                <Grid.Spacer size="1fr" />
                <Grid.Spacer size="2rem" />
                <Grid.Spacer size="1fr" />
              </Grid.Header>

              <Grid.Heading>Display</Grid.Heading>
              <Grid.Row>
                <Grid.Input
                  attribute="attr_rolls_whisper"
                  compact
                  type="checkbox"
                  defaultValue="/w gm "
                />
                <Grid.Label compact>Whisper rolls</Grid.Label>
                <Grid.Input
                  attribute="attr_rolls_show_name"
                  compact
                  type="checkbox"
                />
                <Grid.Label compact>Show character name</Grid.Label>
              </Grid.Row>

              <Grid.Heading>Query Modifiers</Grid.Heading>
              <Grid.Row>
                <Grid.Input
                  attribute="attr_rolls_query_ability"
                  compact
                  type="checkbox"
                />
                <Grid.Label compact>Ability checks</Grid.Label>
                <Grid.Input
                  attribute="attr_rolls_query_initiative"
                  compact
                  type="checkbox"
                />
                <Grid.Label compact>Initiative checks</Grid.Label>
              </Grid.Row>

              <Grid.Row>
                <Grid.Input
                  attribute="attr_rolls_query_saving_throws"
                  compact
                  type="checkbox"
                />
                <Grid.Label compact>Saving throws</Grid.Label>
                <Grid.Input
                  attribute="attr_rolls_query_skills"
                  compact
                  type="checkbox"
                />
                <Grid.Label compact>Skill checks</Grid.Label>
              </Grid.Row>

              <Grid.Row>
                <Grid.Input
                  attribute="attr_rolls_query_attack"
                  compact
                  type="checkbox"
                />
                <Grid.Label compact>Attack rolls</Grid.Label>
                <Grid.Input
                  attribute="attr_rolls_query_damage"
                  compact
                  type="checkbox"
                />
                <Grid.Label compact>Damage rolls</Grid.Label>
              </Grid.Row>
            </Grid>
          </SectionBlock>

          <SectionBlock title="Skills">
            <Grid>
              <Grid.Header>
                <Grid.Label align="left" size="3fr">
                  Skill
                </Grid.Label>
                <Grid.Label size="3fr">Ability</Grid.Label>
                <Grid.Spacer size="1fr" />
                <Grid.Label align="left" size="3fr">
                  Skill
                </Grid.Label>
                <Grid.Label size="3fr">Ability</Grid.Label>
              </Grid.Header>

              {filteredSkills
                .slice(0, Math.ceil(skills.length / 2))
                .map((skill, index, array) => {
                  const skill1 = skill
                  const skill2 = filteredSkills[array.length + index]

                  return (
                    <Grid.Row key={skill1.name}>
                      <Grid.Label>{skill1.name}</Grid.Label>
                      <Grid.Input
                        attribute={`attr_skills_${skill1.name.replace(
                          /\s/g,
                          '_'
                        )}_ability`}
                        options={[
                          ['str', 'Strength'],
                          ['dex', 'Dexterity'],
                          ['con', 'Constitution'],
                          ['int', 'Intelligence'],
                          ['wis', 'Wisdom'],
                          ['cha', 'Charisma'],
                        ]}
                        defaultValue={getAbbreviationForAttribute(
                          skill1.ability
                        )}
                        type="select"
                      />
                      {skill2 ? (
                        <React.Fragment>
                          <Grid.Spacer />
                          <Grid.Label>{skill2.name}</Grid.Label>
                          <Grid.Input
                            attribute={`attr_skills_${skill2.name.replace(
                              /\s/g,
                              '_'
                            )}_ability`}
                            options={[
                              ['str', 'Strength'],
                              ['dex', 'Dexterity'],
                              ['con', 'Constitution'],
                              ['int', 'Intelligence'],
                              ['wis', 'Wisdom'],
                              ['cha', 'Charisma'],
                            ]}
                            defaultValue={getAbbreviationForAttribute(
                              skill2.ability
                            )}
                            type="select"
                          />
                        </React.Fragment>
                      ) : null}
                    </Grid.Row>
                  )
                })}
            </Grid>
          </SectionBlock>
        </ColumnLayout.Column>

        <ColumnLayout.Column size="1fr">
          <SectionBlock title="House Rules">
            <Grid>
              <Grid.Header>
                <Grid.Spacer size="2rem" />
                <Grid.Spacer size="1fr" />
              </Grid.Header>

              <Grid.Heading>Resolve</Grid.Heading>
              <Grid.Row>
                <Grid.Input
                  attribute="attr_homebrew_resolve"
                  compact
                  type="checkbox"
                />
                <Grid.Label compact>
                  Resolve uses highest ability score
                </Grid.Label>
              </Grid.Row>

              <Grid.Heading>Bonuses</Grid.Heading>
              <Grid.Row>
                <Grid.Input
                  attribute="attr_homebrew_circumstance_stacking"
                  compact
                  type="checkbox"
                />
                <Grid.Label compact>Circumstance bonuses stack</Grid.Label>
              </Grid.Row>

              <Grid.Row>
                <Grid.Input
                  attribute="attr_homebrew_luck_stacking"
                  compact
                  type="checkbox"
                />
                <Grid.Label compact>Luck bonuses stack</Grid.Label>
              </Grid.Row>

              <Grid.Heading>Combat</Grid.Heading>
              <Grid.Row>
                <Grid.Input
                  attribute="attr_homebrew_kac"
                  compact
                  type="checkbox"
                />
                <Grid.Label compact>
                  AC vs. combat maneuvers is 4 + KAC
                </Grid.Label>
              </Grid.Row>

              <Grid.Heading>Specialization</Grid.Heading>
              <Grid.Row>
                <Grid.Input
                  attribute="attr_homebrew_operative_specialization"
                  compact
                  type="checkbox"
                />
                <Grid.Label compact>
                  Operative weapons add full level to specialization
                </Grid.Label>
              </Grid.Row>

              <Grid.Row>
                <Grid.Input
                  attribute="attr_homebrew_small_arms_specialization"
                  compact
                  type="checkbox"
                />
                <Grid.Label compact>
                  Small Arms weapons add full level to specialization
                </Grid.Label>
              </Grid.Row>
            </Grid>
          </SectionBlock>
        </ColumnLayout.Column>
      </ColumnLayout>
    </div>
  )
}

module.exports = OptionsScreen
