import { ChangeNotifier } from './change-notifier.mjs'
import { Navigator } from './navigator.mjs'
import * as formatters from './utils/formatter.mjs'

import skills from './data/skills.mjs'

const commonFormats = {
  adjustedScore: (abilityScoreName) => ({
    calculate: (values) => {
      const penalty = values[`${abilityScoreName}_penalty`]
      const drain = values[`${abilityScoreName}_drain`]

      let adjustedScore = values[`${abilityScoreName}_base`]

      if (penalty) {
        adjustedScore = adjustedScore - 2 * Math.floor(penalty / 2)
      }

      if (drain) {
        adjustedScore = adjustedScore - drain
      }

      return Math.max(adjustedScore, 0)
    },
    dependencies: [
      `${abilityScoreName}_base`,
      `${abilityScoreName}_penalty`,
      `${abilityScoreName}_drain`,
    ],
    format: formatters.formatInteger,
    parse: formatters.parseInteger,
  }),
  boolean: {
    format: formatters.formatBoolean,
    parse: formatters.parseBoolean,
  },
  bulk: {
    format: formatters.formatBulk,
    parse: formatters.parseBulk,
  },
  integer: {
    format: formatters.formatInteger,
    parse: formatters.parseInteger,
    defaultValue: 0,
  },
  modifier: (abilityScoreName) => ({
    calculate: (values) => {
      const adjustedScore = values[`${abilityScoreName}_adjusted`]

      return Math.floor((adjustedScore - 10) / 2)
    },
    dependencies: [`${abilityScoreName}_adjusted`],
    format: formatters.formatInteger,
    parse: formatters.parseInteger,
  }),
  string: {
    format: (value) => value,
    parse: (value) => value,
  },
}

const commonCalculators = {
  sum: (values, dependencies) =>
    dependencies
      .map((dependency) => values[dependency])
      .flat()
      .reduce((sum, value) => sum + value, 0),
  sumWithBase: (base) => (values, dependencies) =>
    dependencies
      .map((dependency) => values[dependency])
      .flat()
      .reduce((sum, value) => sum + value, base),
}

Navigator.addErrorListeners()
Navigator.addTabListeners([
  'character',
  'feats',
  'equipment',
  'spells',
  'options',
])

const notifier = new ChangeNotifier()

/* Navigation */
notifier.addListener('navigation_tab', commonFormats.string)
notifier.addListener('error_message', commonFormats.string)
notifier.addListener('show_error', commonFormats.boolean)

/* Options screen */
notifier.addNestedListener('repeating_classes', {
  name: commonFormats.string,
  level: commonFormats.integer,
  bab: commonFormats.string,
  hp: commonFormats.integer,
  sp: commonFormats.integer,
  fortitude_save_progression: commonFormats.string,
  reflex_save_progression: commonFormats.string,
  will_save_progression: commonFormats.string,
  key_ability: commonFormats.string,
})

notifier.addListener('class_display', {
  ...commonFormats.string,
  calculate: (values) =>
    Object.values(values.repeating_classes || {})
      .map((instance) => {
        if (instance.level == null || instance.level == 0) {
          return null
        }

        return `${instance.name} ${instance.level}`
      })
      .filter((instance) => instance != null)
      .join(', '),
  dependencies: ['repeating_classes:name', 'repeating_classes:level'],
})

notifier.addListener('race_name', commonFormats.string)
notifier.addListener('race_type', commonFormats.string)
notifier.addListener('race_subtypes', commonFormats.string)
notifier.addListener('race_hp', commonFormats.integer)
notifier.addListener('race_size', commonFormats.string)
notifier.addListener('race_speed', commonFormats.integer)

notifier.addListener('homebrew_resolve', commonFormats.boolean)
notifier.addListener('homebrew_combat_maneuvers', commonFormats.boolean)

notifier.addListener('rolls_whisper', commonFormats.string)
notifier.addListener('rolls_show_name', commonFormats.boolean)

/* Equipment screen */
notifier.addNestedListener('repeating_armors', {
  armor_equipped: commonFormats.boolean,
  armor_name: commonFormats.string,
  armor_type: commonFormats.string,
  armor_eac: commonFormats.integer,
  armor_kac: commonFormats.integer,
  armor_max_dex: commonFormats.integer,
  armor_acp: commonFormats.integer,
  armor_speed: commonFormats.integer,
  armor_upgrade_slots: commonFormats.integer,
  armor_bulk: commonFormats.bulk,
  armor_level: commonFormats.integer,
  armor_price: commonFormats.integer,
})

notifier.addNestedListener('repeating_weapons', {
  weapon_attack_type: commonFormats.string,
  weapon_attack_type_mod: {
    ...commonFormats.integer,
    calculate: (values, _dependencies, sectionID) => {
      switch (values.repeating_weapons[sectionID].weapon_attack_type) {
        case 'Melee':
          return values.melee_attack_mod

        case 'Thrown':
          return values.thrown_attack_mod

        case 'Ranged':
          return values.ranged_attack_mod

        default:
          return ''
      }
    },
    dependencies: [
      'repeating_weapons:$:weapon_attack_type',
      'melee_attack_mod',
      'ranged_attack_mod',
      'thrown_attack_mod',
    ],
  },
  weapon_attack_misc: commonFormats.integer,
  weapon_attack_mod: {
    ...commonFormats.integer,
    calculate: (values, _dependencies, sectionID) => {
      return (
        values.repeating_weapons[sectionID].weapon_attack_type_mod +
        values.repeating_weapons[sectionID].weapon_attack_misc
      )
    },
    dependencies: [
      'repeating_weapons:$:weapon_attack_type_mod',
      'repeating_weapons:$:weapon_attack_misc',
    ],
  },

  weapon_damage_type: commonFormats.string,
  weapon_damage_base: commonFormats.string,
  weapon_damage_specialization: {
    ...commonFormats.integer,
    // calculate: () => '',
    // dependencies: [],
  },
  weapon_damage_attribute: commonFormats.string,
  weapon_damage_attribute_mod: {
    ...commonFormats.integer,
    calculate: (values, _dependencies, sectionID) => {
      switch (values.repeating_weapons[sectionID].weapon_damage_attribute) {
        case 'STR':
          return values.strength_mod

        case 'DEX':
          return values.dexterity_mod

        case 'CON':
          return values.constitution_mod

        case 'INT':
          return values.intelligence_mod

        case 'WIS':
          return values.wisdom_mod

        case 'CHA':
          return values.charisma_mod

        default:
          return '0'
      }
    },
    dependencies: [
      'repeating_weapons:$:weapon_damage_attribute',
      'strength_mod',
      'dexterity_mod',
      'constitution_mod',
      'intelligence_mod',
      'wisdom_mod',
      'charisma_mod',
    ],
  },

  weapon_capacity: commonFormats.integer,
  weapon_critical_effect: commonFormats.string,
  weapon_effect: commonFormats.string,
  weapon_level: commonFormats.integer,
  weapon_range: commonFormats.string,
  weapon_special: commonFormats.string,
  weapon_usage: commonFormats.integer,
  weapon_weight: commonFormats.bulk,
})

/* Character screen */
;[
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'wisdom',
  'charisma',
].forEach((abilityScoreName) => {
  notifier.addListener(`${abilityScoreName}_base`, {
    ...commonFormats.integer,
    autocalculate: true,
    defaultValue: 10,
  })

  notifier.addListener(`${abilityScoreName}_penalty`, commonFormats.integer)
  notifier.addListener(`${abilityScoreName}_drain`, commonFormats.integer)
  notifier.addListener(
    `${abilityScoreName}_adjusted`,
    commonFormats.adjustedScore(abilityScoreName)
  )

  notifier.addListener(
    `${abilityScoreName}_mod`,
    commonFormats.modifier(abilityScoreName)
  )
})

notifier.addListener('initiative_misc', commonFormats.integer)
notifier.addListener('initiative_bonus', {
  ...commonFormats.integer,
  calculate: commonCalculators.sum,
  dependencies: ['dexterity_mod', 'initiative_misc'],
})

notifier.addListener('eac_misc', commonFormats.integer)
notifier.addListener('eac_armor_bonus', {
  ...commonFormats.integer,
  calculate: (values) =>
    Object.values(values.repeating_armors || {})
      .map((instance) => {
        if (!instance.armor_equipped) {
          return 0
        }

        return instance.armor_eac
      })
      .reduce((total, armorEac) => total + armorEac, 0),
  dependencies: [
    'repeating_armors:armor_equipped',
    'repeating_armors:armor_eac',
  ],
})
notifier.addListener('kac_misc', commonFormats.integer)
notifier.addListener('kac_armor_bonus', {
  ...commonFormats.integer,
  calculate: (values) =>
    Object.values(values.repeating_armors || {})
      .map((instance) => {
        if (!instance.armor_equipped) {
          return 0
        }

        return instance.armor_kac
      })
      .reduce((total, armorKac) => total + armorKac, 0),
  dependencies: [
    'repeating_armors:armor_equipped',
    'repeating_armors:armor_kac',
  ],
})
notifier.addListener('dex_armor_bonus', {
  ...commonFormats.integer,
  calculate: (values) =>
    Math.min(
      values.dexterity_mod,
      ...Object.values(values.repeating_armors || {})
        .filter((instance) => instance.armor_equipped)
        .map((instance) => instance.armor_max_dex)
    ),
  dependencies: [
    'repeating_armors:armor_equipped',
    'repeating_armors:armor_max_dex',
    'dexterity_mod',
  ],
})
notifier.addListener('eac_armor_total', {
  ...commonFormats.integer,
  calculate: commonCalculators.sumWithBase(10),
  dependencies: ['dex_armor_bonus', 'eac_armor_bonus', 'eac_misc'],
})
notifier.addListener('kac_armor_total', {
  ...commonFormats.integer,
  calculate: commonCalculators.sumWithBase(10),
  dependencies: ['dex_armor_bonus', 'kac_armor_bonus', 'kac_misc'],
})
notifier.addListener('combat_maneuver_base', {
  ...commonFormats.integer,
  defaultValue: 8,
  calculate: (values) => (values.homebrew_combat_maneuvers ? 4 : 8),
  dependencies: ['homebrew_combat_maneuvers'],
})
notifier.addListener('combat_maneuver_total', {
  ...commonFormats.integer,
  calculate: commonCalculators.sum,
  dependencies: ['combat_maneuver_base', 'kac_armor_total'],
})

notifier.addListener('base_attack_bonus', {
  ...commonFormats.integer,
  calculate: (values) =>
    Object.values(values.repeating_classes || {})
      .map((instance) => {
        if (instance.level == null) {
          return 0
        }

        switch (instance.bab) {
          case 'full':
            return instance.level

          case 'three-quarter':
            return Math.floor(0.75 * instance.level)

          case 'half':
            return Math.floor(0.5 * instance.level)
        }
      })
      .reduce((total, bab) => total + bab, 0),
  dependencies: ['repeating_classes:bab', 'repeating_classes:level'],
})

notifier.addListener('melee_attack_misc', commonFormats.integer)
notifier.addListener('melee_attack_mod', {
  ...commonFormats.integer,
  calculate: commonCalculators.sum,
  dependencies: ['base_attack_bonus', 'strength_mod', 'melee_attack_misc'],
})

notifier.addListener('ranged_attack_misc', commonFormats.integer)
notifier.addListener('ranged_attack_mod', {
  ...commonFormats.integer,
  calculate: commonCalculators.sum,
  dependencies: ['base_attack_bonus', 'dexterity_mod', 'ranged_attack_misc'],
})

notifier.addListener('thrown_attack_misc', commonFormats.integer)
notifier.addListener('thrown_attack_mod', {
  ...commonFormats.integer,
  calculate: commonCalculators.sum,
  dependencies: ['base_attack_bonus', 'strength_mod', 'thrown_attack_misc'],
})

notifier.addListener('fortitude_save_misc', commonFormats.integer)
notifier.addListener('reflex_save_misc', commonFormats.integer)
notifier.addListener('will_save_misc', commonFormats.integer)

notifier.addListener('fortitude_save_base', {
  ...commonFormats.integer,
  calculate: (values) =>
    Object.values(values.repeating_classes || {})
      .map((instance) => {
        if (instance.level == null) {
          return 0
        }

        switch (instance.fortitude_save_progression) {
          case 'poor':
            return Math.floor((1 / 3) * instance.level)

          case 'good':
            return Math.floor(0.5 * instance.level) + 2
        }
      })
      .reduce((total, baseSave) => total + baseSave, 0),
  dependencies: [
    'repeating_classes:fortitude_save_progression',
    'repeating_classes:level',
  ],
})
notifier.addListener('reflex_save_base', {
  ...commonFormats.integer,
  calculate: (values) =>
    Object.values(values.repeating_classes || {})
      .map((instance) => {
        if (instance.level == null) {
          return 0
        }

        switch (instance.reflex_save_progression) {
          case 'poor':
            return Math.floor((1 / 3) * instance.level)

          case 'good':
            return Math.floor(0.5 * instance.level) + 2
        }
      })
      .reduce((total, baseSave) => total + baseSave, 0),
  dependencies: [
    'repeating_classes:reflex_save_progression',
    'repeating_classes:level',
  ],
})
notifier.addListener('will_save_base', {
  ...commonFormats.integer,
  calculate: (values) =>
    Object.values(values.repeating_classes || {})
      .map((instance) => {
        if (instance.level == null) {
          return 0
        }

        switch (instance.will_save_progression) {
          case 'poor':
            return Math.floor((1 / 3) * instance.level)

          case 'good':
            return Math.floor(0.5 * instance.level) + 2
        }
      })
      .reduce((total, baseSave) => total + baseSave, 0),
  dependencies: [
    'repeating_classes:will_save_progression',
    'repeating_classes:level',
  ],
})

notifier.addListener('fortitude_save_mod', {
  ...commonFormats.integer,
  calculate: commonCalculators.sum,
  dependencies: [
    'fortitude_save_base',
    'constitution_mod',
    'fortitude_save_misc',
  ],
})
notifier.addListener('reflex_save_mod', {
  ...commonFormats.integer,
  calculate: commonCalculators.sum,
  dependencies: ['reflex_save_base', 'dexterity_mod', 'reflex_save_misc'],
})
notifier.addListener('will_save_mod', {
  ...commonFormats.integer,
  calculate: commonCalculators.sum,
  dependencies: ['will_save_base', 'wisdom_mod', 'will_save_misc'],
})

notifier.addListener('resolve_max', {
  ...commonFormats.integer,
  calculate: (values) => {
    const characterLevel = Object.values(values.repeating_classes || {})
      .map((instance) => instance.level || 0)
      .reduce((total, level) => total + level, 0)

    const resolveFromLevels = Math.floor(characterLevel / 2)

    if (values.homebrew_resolve) {
      return Math.max(
        1,
        resolveFromLevels +
          Math.max(
            values.strength_mod,
            values.dexterity_mod,
            values.constitution_mod,
            values.intelligence_mod,
            values.wisdom_mod,
            values.charisma_mod
          )
      )
    }

    return Math.max(
      1,
      resolveFromLevels +
        Math.max(
          ...Object.values(values.repeating_classes || {}).map(
            (instance) => values[`${instance.key_ability}_mod`]
          )
        )
    )
  },
  dependencies: [
    'strength_mod',
    'dexterity_mod',
    'constitution_mod',
    'intelligence_mod',
    'wisdom_mod',
    'charisma_mod',
    'repeating_classes:key_ability',
    'repeating_classes:level',
    'homebrew_resolve',
  ],
})

notifier.addListener('stamina_max', {
  ...commonFormats.integer,
  calculate: (values) => {
    return Object.values(values.repeating_classes || {})
      .map((instance) => {
        if (instance.level == null) {
          return 0
        }

        return instance.level * (instance.sp + values.constitution_mod)
      })
      .reduce((total, classSp) => total + classSp, 0)
  },
  dependencies: [
    'constitution_mod',
    'repeating_classes:sp',
    'repeating_classes:level',
  ],
})
notifier.addListener('health_max', {
  ...commonFormats.integer,
  calculate: (values) => {
    return (
      values.race_hp +
      Object.values(values.repeating_classes || {})
        .map((instance) => {
          if (instance.level == null) {
            return 0
          }

          return instance.level * instance.hp
        })
        .reduce((total, classHp) => total + classHp, 0)
    )
  },
  dependencies: ['race_hp', 'repeating_classes:hp', 'repeating_classes:level'],
})

skills.forEach((skill) => {
  if (skill.name === 'profession') {
    return
  }

  const attributeSkillName = skill.name.replace(/\s/g, '_')

  notifier.addListener(
    `skills_${attributeSkillName}_show_notes`,
    commonFormats.boolean
  )
  notifier.addListener(
    `skills_${attributeSkillName}_notes`,
    commonFormats.string
  )

  notifier.addListener(
    `skills_${attributeSkillName}_class_skill`,
    commonFormats.boolean
  )
  notifier.addListener(
    `skills_${attributeSkillName}_ranks`,
    commonFormats.integer
  )
  notifier.addListener(
    `skills_${attributeSkillName}_insight`,
    commonFormats.integer
  )
  notifier.addListener(
    `skills_${attributeSkillName}_misc`,
    commonFormats.integer
  )
  notifier.addListener(
    `skills_${attributeSkillName}_ability`,
    commonFormats.string
  )

  notifier.addListener(`skills_${attributeSkillName}_mod`, {
    ...commonFormats.integer,
    calculate: (values) => {
      let skillModifier =
        values[`skills_${attributeSkillName}_ranks`] +
        values[`skills_${attributeSkillName}_insight`] +
        values[`skills_${attributeSkillName}_misc`]

      if (
        values[`skills_${attributeSkillName}_class_skill`] &&
        values[`skills_${attributeSkillName}_ranks`] > 0
      ) {
        skillModifier += 3
      }

      switch (values[`skills_${attributeSkillName}_ability`]) {
        case 'str':
          skillModifier += values.strength_mod
          break

        case 'dex':
          skillModifier += values.dexterity_mod
          break

        case 'con':
          skillModifier += values.constitution_mod
          break

        case 'int':
          skillModifier += values.intelligence_mod
          break

        case 'wis':
          skillModifier += values.wisdom_mod
          break

        case 'cha':
          skillModifier += values.charisma_mod
          break
      }

      return skillModifier
    },
    dependencies: [
      `skills_${attributeSkillName}_class_skill`,
      `skills_${attributeSkillName}_ranks`,
      `skills_${attributeSkillName}_insight`,
      `skills_${attributeSkillName}_misc`,
      `skills_${attributeSkillName}_ability`,
      'strength_mod',
      'dexterity_mod',
      'constitution_mod',
      'intelligence_mod',
      'wisdom_mod',
      'charisma_mod',
    ],
  })
})

/* Multiple dependency attributes */
notifier.addListener('encumbrance_carried', {
  ...commonFormats.bulk,
  autocalculate: true,
  defaultValue: 0,
  dependencies: ['repeating_armors:armor_bulk'],
  calculate: commonCalculators.sum,
})

notifier.addListener('encumbrance_encumbered', {
  ...commonFormats.bulk,
  autocalculate: true,
  defaultValue: 5,
  dependencies: ['strength_adjusted'],
  calculate: (values) => Math.floor(values.strength_adjusted / 2),
})

notifier.addListener('encumbrance_overburden', {
  ...commonFormats.bulk,
  autocalculate: true,
  defaultValue: 10,
  dependencies: ['strength_adjusted'],
  calculate: (values) => values.strength_adjusted,
})

notifier.start()
