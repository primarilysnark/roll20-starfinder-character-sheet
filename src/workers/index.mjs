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
      .reduce((sum, value) => sum + value, 0),
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
  level: commonFormats.integer,
  bab: commonFormats.string,
  hp: commonFormats.integer,
  sp: commonFormats.integer,
  fortitude_save_progression: commonFormats.string,
  reflex_save_progression: commonFormats.string,
  will_save_progression: commonFormats.string,
  key_ability: commonFormats.string,
})

notifier.addListener('race_hp', commonFormats.integer)

notifier.addListener('homebrew_resolve', commonFormats.boolean)

notifier.addListener('rolls_whisper', commonFormats.string)
notifier.addListener('rolls_show_name', commonFormats.boolean)

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

notifier.start()
