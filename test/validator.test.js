import {validateRgbInput} from '../validator.js';
import {validateRgbMessage} from '../messages.js';

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

describe('validateRgbInput', function () {
    test.each(rgbCases)(
        'given %p as input, should return %p',
        (input, output) => {
            expect(validateRgbInput(input)).toBe(output);
        }
    );
});