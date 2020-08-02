const React = require('react')

const CharacterSheet = require('./character-sheet')
const RollTemplates = require('./roll-templates')

const CharacterScreen = require('./screens/character')
const EquipmentScreen = require('./screens/equipment')
const FeatsScreen = require('./screens/feats')
const OptionsScreen = require('./screens/options')
const SpellsScreen = require('./screens/spells')

module.exports = function Sheet() {
  return (
    <React.Fragment>
      <CharacterSheet>
        <CharacterSheet.Tab name="character" label="Character">
          <CharacterScreen />
        </CharacterSheet.Tab>
        <CharacterSheet.Tab name="feats" label="Feats and Abilities">
          <FeatsScreen />
        </CharacterSheet.Tab>
        <CharacterSheet.Tab name="equipment" label="Equipment">
          <EquipmentScreen />
        </CharacterSheet.Tab>
        <CharacterSheet.Tab name="spells" label="Spells">
          <SpellsScreen />
        </CharacterSheet.Tab>
        <CharacterSheet.Tab name="options" label="Options">
          <OptionsScreen />
        </CharacterSheet.Tab>
      </CharacterSheet>

      <RollTemplates />
    </React.Fragment>
  )
}
