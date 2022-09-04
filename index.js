#! /usr/bin/env node

import inquirer from 'inquirer';
import clipboard from 'clipboardy';
import {ColorFormat} from './color-format.js';
import {validateRgbInput} from './validator.js';
import {convertRgbToHex} from './converter.js';

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