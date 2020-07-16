import { ChangeNotifier } from './change-notifier';
import * as formatters from './utils/formatter';

new ChangeNotifier()
  .register('strength_base', {
    format: formatters.formatInteger,
    parse: formatters.parseInteger,
  })
  .register('strength_penalty', {
    format: formatters.formatInteger,
    parse: formatters.parseInteger,
  })
  .register('strength_drain', {
    format: formatters.formatInteger,
    parse: formatters.parseInteger,
  })
  .register('strength_mod', {
    calculate: ({ strength_base, strength_penalty, strength_drain }) => {
      console.log(strength_base, strength_drain, strength_penalty);

      let adjustedScore = strength_base;

      if (strength_penalty) {
        adjustedScore = adjustedScore - 2 * Math.floor(strength_penalty / 2);
      }

      if (strength_drain) {
        adjustedScore = adjustedScore - strength_drain;
      }

      return Math.floor((adjustedScore - 10) / 2);
    },
    dependencies: ['strength_base', 'strength_penalty', 'strength_drain'],
    format: formatters.formatModifier,
    parse: formatters.parseModifier,
  })
  .register('melee_attack_bonus', {
    calculate: (values) => values['strength_mod'],
    dependencies: ['strength_mod'],
    format: formatters.formatModifier,
    parse: formatters.parseModifier,
  })
  .listen();
