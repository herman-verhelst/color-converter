const RGB_MAX_VALUE = 255;
const RGB_MIN_VALUE = 0;

/**
 * Checks if provided input is correct
 * @param {string} input - User input
 * @returns {string | boolean} Error message if invalid user input | True if valid user input
 * */
export function validateRgbInput(input) {
    const message = '😞 You should provide three numbers between 0 and 255 seperated by a space...';

    // Check if only numbers are provided
    if (!/^\d+$/.test(input.replace(/\s/g, ''))) return message;

    // Replace extra whitespaces and create array with provided numbers
    let numbers = input.replace(/\s\s+/g, ' ').split(' ');

    // Check if only three numbers are provided
    if (numbers.length !== 3) return message;

    // Check if provided numbers are between min and max rgb values
    if (numbers.find(number => number < RGB_MIN_VALUE || number > RGB_MAX_VALUE)) return message;

    return true;
}

export function validateHexInput(input) {
    return true;
}