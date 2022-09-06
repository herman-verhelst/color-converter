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
    input = input.substring(1);
    if (input.length === 3) {
        return `rgb(${convertSingleHexValueToRgb(input[0], input[0])} ${convertSingleHexValueToRgb(input[1], input[1])} ${convertSingleHexValueToRgb(input[2], input[2])})`;
    }
    return `rgb(${convertSingleHexValueToRgb(input[0], input[1])} ${convertSingleHexValueToRgb(input[2], input[3])} ${convertSingleHexValueToRgb(input[4], input[5])})`;
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