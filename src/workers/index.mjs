import * as formatters from './utils/formatter.mjs'
import { ChangeNotifier } from './change-notifier.mjs'
import { Navigator } from './navigator.mjs'

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
    format: formatters.formatModifier,
    parse: formatters.parseModifier,
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
notifier.addListener('navigation_tab')
notifier.addListener('error_message')
notifier.addListener('show_error', commonFormats.boolean)

notifier.addListener('strength_base', commonFormats.integer)
notifier.addListener('strength_penalty', commonFormats.integer)
notifier.addListener('strength_drain', commonFormats.integer)
notifier.addListener(
  'strength_adjusted',
  commonFormats.adjustedScore('strength')
)
notifier.addListener('strength_mod', commonFormats.modifier('strength'))

notifier.addListener('dexterity_base', commonFormats.integer)
notifier.addListener('dexterity_penalty', commonFormats.integer)
notifier.addListener('dexterity_drain', commonFormats.integer)
notifier.addListener(
  'dexterity_adjusted',
  commonFormats.adjustedScore('dexterity')
)
notifier.addListener('dexterity_mod', commonFormats.modifier('dexterity'))

notifier.addListener('constitution_base', commonFormats.integer)
notifier.addListener('constitution_penalty', commonFormats.integer)
notifier.addListener('constitution_drain', commonFormats.integer)
notifier.addListener(
  'constitution_adjusted',
  commonFormats.adjustedScore('constitution')
)
notifier.addListener('constitution_mod', commonFormats.modifier('constitution'))

notifier.addListener('intelligence_base', commonFormats.integer)
notifier.addListener('intelligence_penalty', commonFormats.integer)
notifier.addListener('intelligence_drain', commonFormats.integer)
notifier.addListener(
  'intelligence_adjusted',
  commonFormats.adjustedScore('intelligence')
)
notifier.addListener('intelligence_mod', commonFormats.modifier('intelligence'))

notifier.addListener('wisdom_base', commonFormats.integer)
notifier.addListener('wisdom_penalty', commonFormats.integer)
notifier.addListener('wisdom_drain', commonFormats.integer)
notifier.addListener('wisdom_adjusted', commonFormats.adjustedScore('wisdom'))
notifier.addListener('wisdom_mod', commonFormats.modifier('wisdom'))

notifier.addListener('charisma_base', commonFormats.integer)
notifier.addListener('charisma_penalty', commonFormats.integer)
notifier.addListener('charisma_drain', commonFormats.integer)
notifier.addListener(
  'charisma_adjusted',
  commonFormats.adjustedScore('charisma')
)
notifier.addListener('charisma_mod', commonFormats.modifier('charisma'))

notifier.addListener('initiative_misc', commonFormats.integer)
notifier.addListener('initiative_bonus', {
  ...commonFormats.modifier,
  calculate: commonCalculators.sum,
  dependencies: ['dexterity_mod', 'initiative_misc'],
})

notifier.addNestedListener('repeating_classes', {
  level: commonFormats.integer,
  bab: commonFormats.string,
})
notifier.addListener('base_attack_bonus', {
  ...commonFormats.integer,
  calculate: (values) =>
    Object.values(values.repeating_classes)
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

notifier.start()
