/**
 * Left pads a string with a character until it reaches the target length.
 * @param {String} str The string to pad.
 * @param {Int} targetLen How long the string should be.
 * @param {String} padChar The character to use when padding.
 * @returns The padded string.
 */
export const leftPad = (str, targetLen, padChar='') => {
    str = '' + str;

    while (str.length < targetLen) {
        str = padChar + str;
    }

    return str;
}

/**
 * @param {Int} seconds A time in seconds.
 * @returns The time in HH:MM:SS format.
 */
export const formatTime = (seconds) => {
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;

    let hours = Math.floor(minutes / 60);
    minutes = minutes % 60;

    return `${leftPad(hours, 2, "0")}:${leftPad(minutes, 2, "0")}:${leftPad(seconds, 2, "0")}`;
}