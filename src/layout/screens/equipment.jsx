const React = require('react')

const SectionBlock = require('../section-block')
const Grid = require('../components/grid')

function EquipmentScreen() {
  return (
    <div>
      <SectionBlock title="Armor and Shields">
        <Grid tall>
          <Grid.Header>
            <Grid.Label size="16px">Equipped</Grid.Label>
            <Grid.Label size="5fr">Name</Grid.Label>
            <Grid.Label size="2.75fr">Type</Grid.Label>
            <Grid.Label size="1fr">EAC Bonus</Grid.Label>
            <Grid.Label size="1fr">KAC Bonus</Grid.Label>
            <Grid.Label size="2.5fr">Maximum Dexterity Bonus</Grid.Label>
            <Grid.Label size="2fr">Armor Check Penalty</Grid.Label>
            <Grid.Label size="1.25fr">Speed</Grid.Label>
            <Grid.Label size="2fr">Upgrade Slots</Grid.Label>
            <Grid.Label size="1fr">Bulk</Grid.Label>
            <Grid.Label size="1fr">Level</Grid.Label>
            <Grid.Label size="2fr">Price</Grid.Label>
          </Grid.Header>

          <fieldset className="repeating_armors">
            <Grid.Row>
              <Grid.Input
                attribute="attr_armor_equipped"
                type="checkbox"
                defaultValue="1"
              />
              <Grid.Input
                align="left"
                attribute="attr_armor_name"
                type="text"
              />
              <Grid.Input
                attribute="attr_armor_type"
                options={['', 'Light', 'Heavy', 'Powered', 'Shield']}
                type="select"
              />
              <Grid.Input attribute="attr_armor_eac" type="text" />
              <Grid.Input attribute="attr_armor_kac" type="text" />
              <Grid.Input attribute="attr_armor_max_dex" type="text" />
              <Grid.Input attribute="attr_armor_acp" type="text" />
              <Grid.Input attribute="attr_armor_speed" type="text" />
              <Grid.Input attribute="attr_armor_upgrade_slots" type="text" />
              <Grid.Input attribute="attr_armor_bulk" type="text" />
              <Grid.Input attribute="attr_armor_level" type="text" />
              <Grid.Input attribute="attr_armor_price" type="text" />
            </Grid.Row>

            <input name="attr_armor_type" type="hidden" />
            <div className="grid-layout__hidden grid-layout__hidden--powered">
              Powered!
            </div>
          </fieldset>
        </Grid>
      </SectionBlock>
    </div>
  )
}

module.exports = EquipmentScreen
