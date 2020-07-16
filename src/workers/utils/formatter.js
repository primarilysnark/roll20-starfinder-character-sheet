export const parseModifier = (value) => {
  if (typeof value === 'number') {
    return value;
  }

  if (value.startsWith('–')) {
    return -1 * parseInt(value.substring(1), 10);
  }

  if (value.startsWith('+')) {
    return parseInt(value.substring(1), 10);
  }

  return parseInt(value, 10);
}

export const formatModifier = (value) => {
  if (value > 0) {
    return `+${value}`;
  }

  if (value < 0) {
    return `–${Math.abs(value)}`;
  }

  return Math.abs(value);
}

export const parseInteger = (value) => {
  if (value == null || value === '') {
    return null;
  }

  if (typeof value !== 'number') {
    return parseInt(value, 10);
  }

  if (!Number.isInteger(value)) {
    return Math.round(value);
  }

  return value;
};

export const formatInteger = (value) => value.toString();
