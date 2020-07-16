const SFGlobals = {
  abilities: ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'],
};

const SFUtil = {
  getBaseAttributeName: (attributeName) => {
    const splitIndex = attributeName.lastIndexOf('_');

    if (splitIndex === '-1') {
      return attributeName;
    }

    return attributeName.substring(0, splitIndex);
  },
  calculateModifier: (score, penalty, drain) => {
    const adjustedScore = score - 2 * Math.floor(penalty / 2) - drain;

    return Math.floor((adjustedScore - 10) / 2);
  },
};

const SFFormat = {
  asInteger: (value) => {
    if (typeof value === 'number') {
      return value;
    }

    return parseInt(value, 10);
  },
  asModifier: (value) => {
    if (value > 0) {
      return `+${value}`;
    }

    if (value < 0) {
      return `–${Math.abs(value)}`;
    }

    return `±${value}`;
  },
};

on(SFGlobals.abilities.map((field) => `change:${field}_base change:${field}_penalty change:${field}_drain`).join(' '), (event) => {
  const baseAttributeName = SFUtil.getBaseAttributeName(event.sourceAttribute);

  const abilityScoreAttributeName = `${baseAttributeName}_base`;
  const abilityPenaltyAttributeName = `${baseAttributeName}_penalty`;
  const abilityDrainAttributeName = `${baseAttributeName}_drain`;
  const abilityModifierAttributeName = `${baseAttributeName}_mod`;

  getAttrs([
    abilityScoreAttributeName,
    abilityPenaltyAttributeName,
    abilityDrainAttributeName,
  ], (values) => {
    const baseAbilityScore = SFFormat.asInteger(values[abilityScoreAttributeName]);
    const abilityPenalty = SFFormat.asInteger(values[abilityPenaltyAttributeName]);
    const abilityDrain = SFFormat.asInteger(values[abilityDrainAttributeName]);

    console.log(values);

    if (baseAbilityScore) {
      const newModifier = SFUtil.calculateModifier(baseAbilityScore, abilityPenalty || 0, abilityDrain || 0);

      setAttrs({
        [abilityModifierAttributeName]: SFFormat.asModifier(newModifier),
      });
    } else {
      setAttrs({
        [abilityModifierAttributeName]: '',
      });
    }
  });
});
