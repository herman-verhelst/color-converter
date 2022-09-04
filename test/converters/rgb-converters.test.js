import {convertRgbToHex} from '../../converters/rgb-converters.js';

const rgbToHexCases = [['255 255 255', '#ffffff'], ['0 0 0', '#000000'], ['254 153 32', '#fe9920']];

describe('convertRgbToHex', function () {
    test.each(rgbToHexCases) (
        "given %p as argument, should return correct output %p",
        (rgbValue, expectedHexValue) => {
            expect(convertRgbToHex(rgbValue)).toBe(expectedHexValue);
        }
    )
});