export const SECONDS = 60;
export const MILLISECONDS = 1000;

/**
 * Pads number values that are less than 9.
 */
const zeroPad = number => (number < 10 ? `0${number}` : `${number}`);

/**
 * Pads milliseconds with zero if value is less than 100
 *
 * @param {number} number to pad
 * @return {string} the padded number
 */
const zeroPadMillisecond = number => (number < 100 ? `0${number}` : `${number}`);

/**
 * Returns minutes.
 *
 * @param {number} totalMilliseconds the millisecond value
 *
 * @return {number} minutes from milliseconds
 */
export const getMinutes = totalMilliseconds =>
  (totalMilliseconds / MILLISECONDS) / SECONDS;


/**
 *
 * @param {number} totalMilliseconds the millisecond value
 *
 * @return {number} seconds from milliseconds
 */
export const getSeconds = totalMilliseconds =>
  (totalMilliseconds / MILLISECONDS) % SECONDS;


/**
 *
 * @param {number} totalMilliseconds
 *
 * @return {number} milliseconds from totalMilliseconds
 */
export const getMilliseconds = totalMilliseconds => totalMilliseconds % MILLISECONDS;

/**
 * Get total milliseconds
 *
 * @param {number} minutes the total minutes
 *
 * @return {number} milliseconds the total milliseconds
 */
export const getTotalMilliseconds = minutes => minutes * SECONDS * MILLISECONDS;

/**
 * Utility function to convert second format into mm:ss:mm format
 *
 * @param {number} totalMilliseconds
 *
 * @return {string} of mm:ss:mm
 */
export default (totalMilliseconds) => {
  const mm = Math.floor(getMinutes(totalMilliseconds));
  const ss = Math.floor(getSeconds(totalMilliseconds));
  const milli = getMilliseconds(totalMilliseconds);

  return `${zeroPad(mm)}:${zeroPad(ss)}:${zeroPadMillisecond(milli)}`;
};
