import {validateHexMessage, validateRgbMessage} from './messages.js';

const RGB_MAX_VALUE = 255;
const RGB_MIN_VALUE = 0;

/**
 * Checks if provided RGB input is correct
 * @param {string} input - User input
 * @returns {string | boolean} Error message if invalid user input | True if valid user input
 */
export function validateRgbInput(input) {
    input = input.replace(/\s\s+/g, ' ').replace(/(\(|\s\s+|rgb|,|\))/g, '');

    // Check if only numbers, 'rgb', brackets or commas are provided
    if (!/^(?=.*\d)[\d ]+$/.test(input)) return validateRgbMessage;

    // Replace extra whitespaces and create array with provided numbers
    let numbers = input.replace(/\s\s+/g, ' ').split(' ');

    // Check if only three numbers are provided
    if (numbers.length !== 3) return validateRgbMessage;

    // Check if provided numbers are between min and max rgb values
    if (numbers.find(number => number < RGB_MIN_VALUE || number > RGB_MAX_VALUE)) return validateRgbMessage;

    return true;
}

/**
 * Checks if provided hex input is correct
 * @param {string} input - User input
 * @returns {string | boolean} Error message if invalid user input | True if valid user input
 */
export function validateHexInput(input) {
    // Check if input is of desired length
    if (input.length !== 7 && input.length !== 4) return validateHexMessage;

    // Check if first character is a #
    if (input[0] !== '#') return validateHexMessage;

    // Check if last characters are valid hex values
    const regex = /[0-9A-Fa-f]{3,6}/g;
    if (!regex.test(input.substring(1))) return validateHexMessage;

    return true;
}