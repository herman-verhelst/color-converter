/**
 * Converts RGB color value to hex color value
 * @param {string[]} rgb - Array with rgb values
 * @returns {string} Hex value of color
 *  */
export function convertRgbToHex(rgb) {
    let hex = '#';
    rgb.forEach(value => hex += convertSingleRgbValueToHex(value));
    return hex;
}

/**
 * Converts a single RGB value to its hexadecimal form
 * @param {string} value - Single RGB value
 * @returns {string} Hexadecimal form of the input
 * */
function convertSingleRgbValueToHex(value) {
    value = parseInt(value).toString(16);

    // Add leading 0 if necessary
    if (value.length === 1) value = '0' + value;
    return value;
}