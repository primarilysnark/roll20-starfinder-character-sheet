import { ChangeNotifier } from './change-notifier'
import * as formatters from './utils/formatter'

const commonFormats = {
  boolean: {
    format: formatters.formatBoolean,
    parse: formatters.parseBoolean,
  },
  integer: {
    format: formatters.formatInteger,
    parse: formatters.parseInteger,
  },
  modifier: (abilityScoreName) => ({
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

      return Math.floor((adjustedScore - 10) / 2)
    },
    dependencies: [
      `${abilityScoreName}_base`,
      `${abilityScoreName}_penalty`,
      `${abilityScoreName}_drain`,
    ],
    format: formatters.formatModifier,
    parse: formatters.parseModifier,
  }),
}

new ChangeNotifier()
  .register('error_message')
  .register('show_error', commonFormats.boolean)

  .register('strength_base', commonFormats.integer)
  .register('strength_penalty', commonFormats.integer)
  .register('strength_drain', commonFormats.integer)
  .register('strength_mod', commonFormats.modifier('strength'))

  .register('dexterity_base', commonFormats.integer)
  .register('dexterity_penalty', commonFormats.integer)
  .register('dexterity_drain', commonFormats.integer)
  .register('dexterity_mod', commonFormats.modifier('dexterity'))

  .register('constitution_base', commonFormats.integer)
  .register('constitution_penalty', commonFormats.integer)
  .register('constitution_drain', commonFormats.integer)
  .register('constitution_mod', commonFormats.modifier('constitution'))

  .register('intelligence_base', commonFormats.integer)
  .register('intelligence_penalty', commonFormats.integer)
  .register('intelligence_drain', commonFormats.integer)
  .register('intelligence_mod', commonFormats.modifier('intelligence'))

  .register('wisdom_base', commonFormats.integer)
  .register('wisdom_penalty', commonFormats.integer)
  .register('wisdom_drain', commonFormats.integer)
  .register('wisdom_mod', commonFormats.modifier('wisdom'))

  .register('charisma_base', commonFormats.integer)
  .register('charisma_penalty', commonFormats.integer)
  .register('charisma_drain', commonFormats.integer)
  .register('charisma_mod', commonFormats.modifier('charisma'))

  .register('melee_attack_bonus', {
    calculate: (values) => values['strength_mod'],
    dependencies: ['strength_mod'],
    format: formatters.formatModifier,
    parse: formatters.parseModifier,
  })
  .listen()

on('clicked:close_error', () => {
  setAttrs({
    error_message: '',
    show_error: commonFormats.boolean.format(false),
  })
})
