import {ColorFormat} from '../color-format.js';

/**
 * Converts hex input to desired color format
 * @param {ColorFormat} colorFormat - Desired end format
 * @param {string} input - User input value
 * @returns {string} color in end format
 * @throws {Error} Will throw an error if the colorFormat isn't an expected value
 */
export function convertHex(colorFormat, input) {
    switch (colorFormat) {
        case ColorFormat.RGB:
            return convertHexToRgb(input);
        default:
            throw new Error('Not a valid color format...');
    }
}

/**
 * Converts hex color value to RGB color value
 * @param {string} input - User input value
 * @returns {string} RGB value of color
 */
export function convertHexToRgb(input) {
    return `rgb(${convertSingleHexValueToRgb(input[1], input[2])} ${convertSingleHexValueToRgb(input[3], input[4])} ${convertSingleHexValueToRgb(input[5], input[6])})`;
}

/**
 * Converts a single RGB value to its hexadecimal form
 * @param {string} value1 - Hex value
 * @param {string} value2 - Hex value
 * @returns {number} RGB form of the input
 */
function convertSingleHexValueToRgb(value1, value2) {
    let rgbValue = '0x' + value1 + value2;
    return +rgbValue;
}