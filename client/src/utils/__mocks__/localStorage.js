/**
 * The mocked localStorage instance to test localStorage against
 *
 * @class LocalStorageMock
 */

class LocalStorage {
  constructor() {
    this.store = {};
  }

  /**
   * Removes all values from the localStorage instance
   *
   */
  clear() {
    this.store = {};
  }

  /**
   * Saves data to localStorage
   *
   * @param {string} key to save the value on
   * @param {string} value to store on the key
   */
  setItem(key, value) {
    this.store[key] = JSON.stringify(value);
  }

  /**
   *
   * @param {string} key to get values from
   *
   * @return {string} the value from the key param
   */
  getItem(key) {
    if (this.store[key] === 'undefined') {
      return 'undefined';
    }

    return this.store[key];
  }
}

// This feels like a hack: We should probably do something like this:
// https://facebook.github.io/jest/docs/en/manual-mocks.html
Object.defineProperty(window, 'localStorage', {
  value: new LocalStorage(),
});

export default new LocalStorage();
