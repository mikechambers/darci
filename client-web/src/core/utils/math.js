/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 * This example returns a random integer between the specified values. The
 * value is no lower than min (or the next integer greater than min if min
 * isn't an integer), and is less than (but not equal to) max.
 * @param {*} min
 * @param {*} max
 * @returns
 */
export const getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
};

/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 * Inclusive at both min and max
 * @param {*} min
 * @param {*} max
 * @returns
 */
export const getRandomIntInclusive = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
};
