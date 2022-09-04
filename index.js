#! /usr/bin/env node

import inquirer from 'inquirer';
import clipboard from 'clipboardy';
import {ColorFormat} from './color-format.js';

const RGB_MAX_VALUE = 255;
const RGB_MIN_VALUE = 0;

const prefix = '    ';
const welcomeMessage = `
    👋 ${'Hi! I\'m a color converter.'}
    I'm in the first place designed to convert a color in RGB format to it's hexadecimal form.
    But I'm much more than that! You'll see.
    
    `;

const startFormatMessage = 'To start, I need the format you currently have.';
const endFormatMessage = 'Now, please select the format you want your color to be converted in.';

const rgbMessage = 'Alright, now I need your color in RGB format:';
const hexConvertedMessage_1 = `
    So, I converted your color`;
const hexConvertedMessage_2 = `to it's hexadecimal value.
    You can find this value in the clipboard of your computer and in the console.
    `;

const lastMessage = `
    I hope I could help you. Hope to see you soon!
    Goodbye 👋
`;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

let startFormat, endFormat;

/**
 * Checks if provided input is correct
 * @param {string} input - User input
 * @returns {string} Error message if incorrect user input
 * @return {boolean} True if correct user input
 * */
function validateRgbInput(input) {
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

/**
 * Converts RGB color value to hex color value
 * @param {string[3]} rgb - Array with rgb values
 * @returns {string} Hex value of color
 *  */
function convertRgbToHex(rgb) {
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

function createHexConvertedMessage(rgb) {
    return `${hexConvertedMessage_1} rgb(${rgb}) ${hexConvertedMessage_2}`;
}

/**
 * Asks the user for input and converts afterwards the color
 */
function askColor() {
    console.clear();
    console.log(welcomeMessage);

    // Ask the user for the start format of the color
    return inquirer.prompt([{
        name: 'startFormat',
        type: 'list',
        prefix: prefix,
        message: startFormatMessage,
        choices: Object.values(ColorFormat).map(colorFormat => colorFormat.displayNameLong)
    }]).then((input) => {
        startFormat = ColorFormat.getColorFormat(input.startFormat);

        // Ask the user for the end format of the color
        return inquirer.prompt([{
            name: 'endFormat',
            type: 'list',
            prefix: prefix,
            message: endFormatMessage,
            choices: Object.values(ColorFormat).filter(colorFormat => colorFormat !== startFormat).map(colorFormat => colorFormat.displayNameLong)
        }]);
    }).then((input) => {
        endFormat = input.endFormat;

        // Ask the user for a color in RGB format
        return inquirer.prompt([{
            name: 'color',
            type: 'input',
            prefix: prefix,
            message: rgbMessage,
            validate: validateRgbInput
        }]);
    }).then((input) => {
        // Convert RGB value to hex value
        const hex = convertRgbToHex(input.color.replace(/\s\s+/g, ' ').split(' '));

        console.clear();
        console.log(createHexConvertedMessage(input.color.replace(/\s\s+/g, ' ')));
        // Copy hex value to the clipboard
        clipboard.writeSync(hex);
        console.log(`    ${hex}`);
        console.log();

        // Ask the user if he wants to restart
        return inquirer.prompt([{
            name: 'end',
            type: 'confirm',
            default: false,
            prefix: prefix,
            message: 'Is there anything else I can do for you?'
        }]).then((input) => {
            if (!input.end) {
                // End the program
                console.log(lastMessage);
                process.exit();
            } else {
                // Restart the program
                askColor();
            }
        });
    });
}

// Start the program
askColor();