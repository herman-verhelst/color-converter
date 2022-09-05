import {validateHexInput, validateRgbInput} from '../src/validator.js';
import {validateHexMessage, validateRgbMessage} from '../src/messages.js';

const rgbCases = [
    ['rgb(255 255 255)', true],
    ['rgb(255, 255, 255)', true],
    ['255, 255, 255', true],
    ['255 255 255', true],
    ['255    255     255', true],
    ['255 255', validateRgbMessage],
    ['rgb(255 255)', validateRgbMessage],
    ['rgb(255 255 300)', validateRgbMessage],
    ['rgb(255 255 -30)', validateRgbMessage],
    ['rgb(255 255 abc)', validateRgbMessage],
    ['abc(255 255 255)', validateRgbMessage],
];

const hexCases = [
    ['#ffffff', true],
    ['#fff', true],
    ['#000', true],
    ['#000000', true],
    ['#000000', true],
    ['#herman', validateHexMessage],
    ['#0000', validateHexMessage],
    ['0000', validateHexMessage],
];

describe('validateRgbInput', function () {
    test.each(rgbCases)(
        'given %p as input, should return %p',
        (input, output) => {
            expect(validateRgbInput(input)).toBe(output);
        }
    );
});

describe('validateHexInput', function () {
    test.each(hexCases)(
        'given %p as input, should return %p',
        (input, output) => {
            expect(validateHexInput(input)).toBe(output);
        }
    )
});