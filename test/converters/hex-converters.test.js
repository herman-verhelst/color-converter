import {convertHexToRgb} from '../../src/converters/hex-converters.js';

const hexToRgbCases = [
    ['#ffffff', 'rgb(255 255 255)'],
    ['#000000', 'rgb(0 0 0)'],
    ['#fe9920', 'rgb(254 153 32)'],
    ['#fff', 'rgb(255 255 255)'],
    ['#000', 'rgb(0 0 0)'],
    ['#f00', 'rgb(255 0 0)']
];

describe('convertHexToRgb', function () {
    test.each(hexToRgbCases) (
        "given %p as argument, should return correct output %p",
        (hexValue, expectedRgbValue) => {
            expect(convertHexToRgb(hexValue)).toBe(expectedRgbValue);
        }
    )
});
