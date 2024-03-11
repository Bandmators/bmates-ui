/**
 * CSS Variables
 * @param obj Theme Data
 * @param prefix prefix
 * @returns
 */
export const cssCustomProperties = (obj: object, prefix: string = '') => {
  let cssString = '';

  Object.entries(obj).forEach(([key, value]) => {
    const propertyName = prefix ? `${prefix}-${key}` : key;

    if (typeof value === 'object') {
      cssString += cssCustomProperties(value, propertyName);
    } else {
      cssString += `--${propertyName}: ${value};\n`;
    }
  });

  return cssString;
};
