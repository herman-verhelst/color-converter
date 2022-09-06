import {ColorFormat} from '../color-format.js';

/**
 * Converts RGB input to desired color format
 * @param {ColorFormat} colorFormat - Desired end format
 * @param {string} input - User input value
 * @returns {string} color in end format
 * @throws {Error} Will throw an error if the colorFormat isn't an expected value
 */
export function convertRgb(colorFormat, input) {
    switch (colorFormat) {
        case ColorFormat.HEX:
            return convertRgbToHex(input);
        default:
            throw new Error('Not a valid color format...');
    }
}

/**
 * Converts RGB color value to hex color value
 * @param {string} input - User input value
 * @returns {string} Hex value of color
 */
export function convertRgbToHex(input) {
    // Convert user input in number array
    const rgb = input.replace(/\s\s+/g, ' ').replace(/(\(|\s\s+|rgb|,|\))/g, '').split(' ').map(value => parseInt(value))

    let hex = '#';
    rgb.forEach(value => hex += convertSingleRgbValueToHex(value));
    return hex;
}

/**
 * Converts a single RGB value to its hexadecimal form
 * @param {number} value - Single RGB value
 * @returns {string} Hexadecimal form of the input
 */
function convertSingleRgbValueToHex(value) {
    let hexValue = value.toString(16);

    // Add leading 0 if necessary
    if (hexValue.length === 1) hexValue = '0' + hexValue;
    return hexValue;
}