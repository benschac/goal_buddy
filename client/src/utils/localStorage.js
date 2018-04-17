/**
 * Load saved localStorage Data
 *
 * @param {string} key to retrieve saved value in localStorage.
 *
 * @return {object} the saved localStorage data.
 */
export const loadLocalStorage = (key) => {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
      return false;
    }
    return JSON.parse(serializedData);
  } catch (e) {
    console.error(`Error ${e}`); // eslint-disable-line
    return undefined;
  }
};

/**
 * Checks if localStorage key has saved data.
 *
 * @param {string} key to check if data is saved on
 *
 * @return {boolean} if localStorage key has saved data
 */
export const isLocalStorageEmpty = key => (!localStorage.getItem(key));

/**
 * Save data to localStorage
 *
 * @param {string} key to save data on
 * @param {object} data to save in localStorage
 */
export const saveLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Error ${e}`); // eslint-disable-line
  }
};
