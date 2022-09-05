// ColorFormat messages
export const inputRgbMessage = 'Alright, now I need your color in RGB format:';
export const inputHexMessage = 'Alright, now I need your color in hex format:';

// Validator messages
export const validateRgbMessage = 'You should provide three numbers between 0 and 255 seperated by a space...';
export const validateHexMessage = 'You should provide a valid hex color value...';

const convertedMessageStart = `
    So, I converted your color`;
const convertedMessageMiddle = `to it's`;
const convertedMessageEnd = `value.
    You can find this value in the clipboard of your computer and in the console.
`;
export function createHexConvertedMessage(input) {
    return `${convertedMessageStart} rgb(${input.replace(/\s\s+/g, ' ').replace(/(\(|\s\s+|rgb|,|\))/g, '')}) ${convertedMessageMiddle} hexadecimal ${convertedMessageEnd}`;
}
export function createRgbConvertedMessage(input) {
    return `${convertedMessageStart} ${input} ${convertedMessageMiddle} RGB ${convertedMessageEnd}`;
}