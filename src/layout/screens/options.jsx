const React = require('react')

const Grid = require('../components/grid')
const SectionBlock = require('../section-block')

function OptionsScreen() {
  return (
    <div>
      <SectionBlock title="Class">
        <Grid>
          <Grid.Heading>
            <Grid.Label starting size="7fr">
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
          </Grid.Heading>

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

      <SectionBlock title="Race">
        <Grid>
          <Grid.Heading>
            <Grid.Label starting size="4fr">
              Name
            </Grid.Label>
            <Grid.Label size="4fr">Type</Grid.Label>
            <Grid.Label size="4fr">Subtypes</Grid.Label>
            <Grid.Label size="4fr">Size</Grid.Label>
            <Grid.Label size="1fr">HP</Grid.Label>
            <Grid.Label size="3fr">Speed</Grid.Label>
          </Grid.Heading>

          <Grid.Row>
            <Grid.Input attribute="atr_race_name" />
            <Grid.Input attribute="atr_race_type" />
            <Grid.Input attribute="atr_race_subtypes" />
            <Grid.Input
              attribute="atr_race_size"
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
            <Grid.Input attribute="atr_race_hp" />
            <Grid.Input attribute="atr_race_speed" />
          </Grid.Row>
        </Grid>
      </SectionBlock>
    </div>
  )
}

module.exports = OptionsScreen
