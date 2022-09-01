export class ColorFormat {
    static RGB = new ColorFormat('RGB', 'RGB');
    static HEX = new ColorFormat('hex', 'Hexadecimal');

    constructor(displayNameShort, displayNameLong) {
        this.displayNameShort = displayNameShort;
        this.displayNameLong = displayNameLong;
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
                throw new Error('Not a valid color format');
        }
    }
}