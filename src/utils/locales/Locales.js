import {
  nextLocale,
  previousLocale,
  getLocale,
  getDefaultLocale,
  normalizeLocale
} from './localeUtils';

// Base class locales.
export class Locales {
  // Constructor.
  constructor(locales) {
    // Add data.
    Object.defineProperty(this, 'data', {
      value: (locales || []).map(locale => normalizeLocale(locale)),
    });

    // Add _ getter for data.
    Object.defineProperty(this, '_', {
      get() { return this.data; }
    });

    // Add length getter for data.
    Object.defineProperty(this, 'length', {
      get() { return this.data.length; }
    });

    // Add map for constructor.
    Object.defineProperty(this, 'map', {
      value: function(...args) {
        return this.data.map(...args);
      }
    });

    // Add find for constructor.
    Object.defineProperty(this, 'find', {
      value: function(locale) {
        const output = this.data.indexOf(normalizeLocale(locale));
        return output >= 0 && this.data[output] || undefined;
      }
    });

    // Add has for constructor.
    Object.defineProperty(this, 'has', {
      value: function(locale) {
        return this.find(locale) !== undefined;
      }
    });

    // Add toString for serialization and display.
    Object.defineProperty(this, 'toString', {
      value: function(...args) {
        return this.data.toString(...args);
      }
    });
  }

  after(index) {
    return nextLocale(index, this.data);
  }

  before(index) {
    return previousLocale(index, this.data);
  }

  get(index) {
    return getLocale(index, this.data);
  }

  get default() {
    return getDefaultLocale(this.data);
  }

  translate(text, locale, translationTable) {
    return translationTable.translate(text, this.get(locale));
  }
}

export const createLocales = Locales.create = (...args) => new Locales(...args);

// Default export.
export default Object.freeze(Locales);