#! /usr/bin/env node

import inquirer from 'inquirer';
import clipboard from "clipboardy";

const RGB_MAX_VALUE = 255;
const RGB_MIN_VALUE = 0;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

/*
* Checks if provided input is correct
* @param {string} input - User input
* @returns {string} Error message if incorrect user input
* @return {boolean} True if correct user input
* */
function validateRgbInput(input) {
    const message = 'You should provide three numbers between 0 and 255 seperated by a space...';

    // Check if only numbers are provided
    if (!/^\d+$/.test(input.replace(/\s/g, ''))) return message;

    // Replace extra whitespaces and create array with provided numbers
    let numbers = input.replace(/\s\s+/g, ' ').split(' ');

    // Check if only three numbers are provided
    if (numbers.length !== 3) return message;

    // Check if provided numbers are between min and max rgb values
    numbers.forEach(number => {
        if (number < RGB_MIN_VALUE || number > RGB_MAX_VALUE) return message;
    });
    return true;
}

/*
* Converts RGB color value to hex color value
* @param {string[3]} rgb - Array with rgb values
* @returns {string} Hex value of color
*  */
function convertRgbToHex(rgb) {
    let hex = '#';
    rgb.forEach(value => hex += convertSingleRgbValueToHex(value));
    return hex;
}

/*
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

/*
* Asks the user for input and converts afterwards the color
* */
function askColor() {
    return inquirer.prompt([{
            name: 'color',
            type: 'input',
            message: 'What is the color you want to convert?',
            validate: validateRgbInput
        }]
    ).then((input) => {
        const hex = convertRgbToHex(input.color.replace(/\s\s+/g, ' ').split(' '));
        clipboard.writeSync(hex);
        console.clear();
        console.log(hex)
    });
}

askColor();