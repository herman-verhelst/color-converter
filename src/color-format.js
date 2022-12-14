import {convertRgb} from './converters/rgb-converters.js';
import {validateHexInput, validateRgbInput} from './validator.js';
import {createHexConvertedMessage, createRgbConvertedMessage, inputHexMessage, inputRgbMessage} from './messages.js';
import {convertHex} from './converters/hex-converters.js';

export class ColorFormat {
    static RGB = new ColorFormat(
        'RGB',
        'RGB',
        convertRgb,
        inputRgbMessage,
        validateRgbInput,
        createHexConvertedMessage
    );
    static HEX = new ColorFormat(
        'hex',
        'Hexadecimal',
        convertHex,
        inputHexMessage,
        validateHexInput,
        createRgbConvertedMessage
    );

    constructor(displayNameShort, displayNameLong, converters, inputMessage, validator, convertedMessageCreator) {
        this.displayNameShort = displayNameShort;
        this.displayNameLong = displayNameLong;
        this.converters = converters;
        this.inputMessage = inputMessage;
        this.validator = validator;
        this.convertedMessageCreator = convertedMessageCreator;
    }

    /**
     * Converts a string to a ColorFormat object
     * @param {string} displayName - Display name of a color format
     * @returns {ColorFormat} ColorFormat belonging to input display name
     * @throws {Error} Will throw an error if the argument doesn't belong to a ColorFormat
     */
    static getColorFormat(displayName) {
        switch (displayName) {
            case ColorFormat.RGB.displayNameLong:
                return ColorFormat.RGB;
            case ColorFormat.HEX.displayNameLong:
                return ColorFormat.HEX;
            default:
                throw new Error('Not a valid color format...');
        }
    }
}