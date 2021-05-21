const React = require('react')

const Grid = require('../components/grid')
const ColumnLayout = require('../components/columns')
const IconButton = require('../components/icon-button')
const SectionBlock = require('../section-block')

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
                options={['', 'Light', 'Heavy', 'Powered', 'Shield', 'Misc']}
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

      <ColumnLayout>
        <ColumnLayout.Column size="2fr">
          <SectionBlock title="Weapons">
            <Grid inverse>
              <Grid.Header>
                <Grid.Spacer size="80px" />
                <Grid.Label align="left" size="8fr">
                  Name
                </Grid.Label>
                <Grid.Label size="2fr">Attack</Grid.Label>
                <Grid.Label size="4fr">Damage</Grid.Label>
                <Grid.Label size="3fr">Capacity</Grid.Label>
              </Grid.Header>

              <fieldset className="repeating_weapons">
                <input name="attr_weapon_edit_mode" type="hidden" />

                <div className="grid-layout__repeating-edit">
                  <Grid.FullWidth>
                    <Grid>
                      <Grid.Header>
                        <Grid.Label align="left" size="7fr">
                          Name
                        </Grid.Label>
                        <Grid.Label align="left" size="3fr">
                          Type
                        </Grid.Label>
                      </Grid.Header>

                      <Grid.Row>
                        <Grid.Input
                          align="left"
                          attribute="attr_weapon_name"
                          placeholder="e.g. Flash Compliance Ray"
                        />
                        <Grid.Input
                          attribute="attr_weapon_type"
                          options={[
                            '',
                            'Advanced Melee',
                            'Basic Melee',
                            'Entropic Strike',
                            'Grenade',
                            'Heavy Weapon',
                            'Longarm',
                            'Operative',
                            'Small Arm',
                            'Sniper',
                            'Solarian Weapon',
                            'Unarmed Strike',
                            'Custom (Non-Proficient)',
                            'Custom (Proficient)',
                            'Custom (Specialized)',
                            'Custom (Half-Specialized)',
                          ]}
                          type="select"
                        />

                        <Grid.FloatButton name="weapon_edit_mode">
                          <IconButton
                            attribute={`attr_weapon_edit_mode`}
                            icon="y"
                            title="Edit weapon"
                          />
                        </Grid.FloatButton>
                      </Grid.Row>
                    </Grid>

                    <Grid>
                      <Grid.Header>
                        <Grid.Spacer size="100px" />
                        <Grid.Label size="3fr">Attack Type</Grid.Label>
                        <Grid.Label size="2fr">Total</Grid.Label>
                        <Grid.Spacer size="4px" />
                        <Grid.Label size="2fr">Attack Mod</Grid.Label>
                        <Grid.Spacer size="4px" />
                        <Grid.Label size="2fr">Misc Bonus</Grid.Label>
                      </Grid.Header>

                      <Grid.Row>
                        <Grid.BlockLabel>Attack</Grid.BlockLabel>
                        <Grid.Input
                          attribute="attr_weapon_attack_type"
                          options={['', 'Melee', 'Ranged', 'Thrown']}
                          type="select"
                        />

                        <Grid.Input
                          attribute="attr_weapon_attack_mod"
                          disabled
                        />
                        <Grid.Label>=</Grid.Label>
                        <Grid.Input
                          attribute="attr_weapon_attack_type_mod"
                          disabled
                        />
                        <Grid.Label>+</Grid.Label>
                        <Grid.Input attribute="attr_weapon_attack_misc" />
                      </Grid.Row>
                    </Grid>

                    <Grid>
                      <Grid.Header>
                        <Grid.Spacer size="100px" />
                        <Grid.Label size="3fr">Damage Type</Grid.Label>
                        <Grid.Label size="2fr">Base Damage</Grid.Label>
                        <Grid.Spacer size="4px" />
                        <Grid.Label size="2fr">Specialization</Grid.Label>
                        <Grid.Spacer size="4px" />
                        <Grid.Label size="2fr">Attribute</Grid.Label>
                      </Grid.Header>

                      <Grid.Row>
                        <Grid.BlockLabel>Damage</Grid.BlockLabel>
                        <Grid.Input
                          attribute="attr_weapon_damage_type"
                          placeholder="e.g. fire"
                        />
                        <Grid.Input
                          attribute="attr_weapon_damage_base"
                          placeholder="e.g. 1d6"
                        />
                        <Grid.Label>+</Grid.Label>
                        <Grid.Input
                          attribute="attr_weapon_damage_specialization"
                          disabled
                        />
                        <Grid.Label>+</Grid.Label>
                        <Grid.Input
                          attribute="attr_weapon_damage_attribute"
                          options={[
                            '',
                            'STR',
                            'DEX',
                            'CON',
                            'INT',
                            'WIS',
                            'CHA',
                          ]}
                          type="select"
                        />
                      </Grid.Row>
                    </Grid>

                    <Grid>
                      <Grid.Header>
                        <Grid.Spacer size="100px" />
                        <Grid.Label align="left" size="1fr">
                          Effect
                        </Grid.Label>
                        <Grid.Label align="left" size="1fr">
                          Critical Effect
                        </Grid.Label>
                      </Grid.Header>

                      <Grid.Row>
                        <Grid.Spacer />
                        <Grid.Input
                          attribute="attr_weapon_effect"
                          placeholder="e.g. first arc [[1d6]]"
                        />
                        <Grid.Input
                          attribute="attr_weapon_critical_effect"
                          placeholder="e.g. bleed [[4d6]]"
                        />
                      </Grid.Row>
                    </Grid>

                    <Grid>
                      <Grid.Header>
                        <Grid.Spacer size="100px" />
                        <Grid.Label align="left" size="4fr">
                          Special
                        </Grid.Label>
                        <Grid.Label size="1fr">Level</Grid.Label>
                      </Grid.Header>

                      <Grid.Row>
                        <Grid.BlockLabel>Details</Grid.BlockLabel>
                        <Grid.Input
                          attribute="attr_weapon_special"
                          placeholder="e.g. unwield"
                        />
                        <Grid.Input attribute="attr_weapon_level" />
                      </Grid.Row>
                    </Grid>

                    <Grid>
                      <Grid.Header>
                        <Grid.Spacer size="100px" />
                        <Grid.Label size="1fr">Weight</Grid.Label>
                        <Grid.Label size="1fr">Range</Grid.Label>
                        <Grid.Label size="1fr">Usage</Grid.Label>
                        <Grid.Label size="1fr">Capacity</Grid.Label>
                      </Grid.Header>

                      <Grid.Row>
                        <Grid.Spacer />
                        <Grid.Input attribute="attr_weapon_weight" />
                        <Grid.Input attribute="attr_weapon_range" />
                        <Grid.Input attribute="attr_weapon_usage" />
                        <Grid.Input attribute="attr_weapon_capacity" />
                      </Grid.Row>
                    </Grid>
                  </Grid.FullWidth>
                </div>

                <div className="grid-layout__repeating">
                  <Grid.Row>
                    <Grid.BlockLabel>
                      <span name="attr_weapon_attack_type" />
                    </Grid.BlockLabel>
                    <Grid.Input disabled attribute="attr_weapon_name" />
                    <Grid.Input disabled attribute="attr_weapon_attack_mod" />
                    <Grid.Input disabled defaultValue="1d8+3 fire" />
                    <Grid.Input disabled defaultValue="19 / 20" />
                    <Grid.FloatButton name="weapon_edit_mode">
                      <IconButton
                        attribute={`attr_weapon_edit_mode`}
                        icon="y"
                        title="Edit weapon"
                      />
                    </Grid.FloatButton>
                  </Grid.Row>
                </div>

                <div className="grid-layout__hidden">
                  <Grid.FullWidth>
                    <div>
                      <Grid.BlockLabel floating>Single</Grid.BlockLabel>
                      <Grid.BlockLabel floating>Full</Grid.BlockLabel>
                      <Grid.BlockLabel floating>Automatic</Grid.BlockLabel>
                      <Grid.Toggle floating>Plasma Sheath</Grid.Toggle>
                      <Grid.Toggle floating isActive>
                        Bipod
                      </Grid.Toggle>
                    </div>
                  </Grid.FullWidth>
                </div>
              </fieldset>
            </Grid>
          </SectionBlock>

          <SectionBlock title="Inventory">Hello</SectionBlock>

          <SectionBlock title="Ship Locker">Hello</SectionBlock>
        </ColumnLayout.Column>

        <ColumnLayout.Column size="1fr">
          <SectionBlock title="Encumbrance">
            <Grid>
              <Grid.Header>
                <Grid.Label size="1fr">Carried</Grid.Label>
                <Grid.Label size="1fr">Encumbered</Grid.Label>
                <Grid.Label size="1fr">Overburdened</Grid.Label>
              </Grid.Header>

              <Grid.Row>
                <Grid.Input disabled attribute="attr_encumbrance_carried" />
                <Grid.Input disabled attribute="attr_encumbrance_encumbered" />
                <Grid.Input disabled attribute="attr_encumbrance_overburden" />
              </Grid.Row>

              <Grid.FullWidth>
                <h3>Unencumbered</h3>
                <ul>
                  <li>No movement speed reduction</li>
                  <li>No maximum Dexterity bonus to AC</li>
                  <li>No penalty to Strength- and Dexterity-based checks</li>
                </ul>

                <h3>Encumbered</h3>
                <ul>
                  <li>Reduce movement speeds by 10 feet</li>
                  <li>Reduce maximum Dexterity bonus to AC to +2</li>
                  <li>
                    Take a –5 penalty to Strength- and Dexterity-based checks
                  </li>
                </ul>

                <h3>Overburdened</h3>
                <ul>
                  <li>Reduce movement speeds to 5 feet</li>
                  <li>Reduce maximum Dexterity bonus to AC to +0</li>
                  <li>
                    Take a –5 penalty to Strength- and Dexterity-based checks
                  </li>
                </ul>
              </Grid.FullWidth>
            </Grid>
          </SectionBlock>
        </ColumnLayout.Column>
      </ColumnLayout>
    </div>
  )
}

module.exports = EquipmentScreen
