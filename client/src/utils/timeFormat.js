export const SECONDS = 60;
export const MILLISECONDS = 1000;

/**
 * Pads number values that are less than 9.
 */
const zeroPad = number => (number < 10 ? `0${number}` : `${number}`);

const zeroPadMillisecond = number => (number < 100 ? `0${number}` : `${number}`);

/**
 * Utility function to convert second format into mm:ss:mm format
 */
export default (totalMilliseconds) => {
  const minutes = (totalMilliseconds / 1000) / 60;
  const mm = Math.floor(minutes);
  const ss = Math.floor(totalMilliseconds / 1000) % 60;
  const milli = totalMilliseconds % 1000;

  return `${zeroPad(mm)}:${zeroPad(ss)}:${zeroPadMillisecond(milli)}`;
};
