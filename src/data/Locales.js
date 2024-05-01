import {
  nextLocale,
  previousLocale,
  getLocale,
  getDefaultLocale
} from '../utils/localeUtils';

import {
  translate as _translate,
  normalizeTranslations as _normalizeTranslations
} from translate;

// Base class locales.
export class Locales {
  // Constructor.
  constructor(locales) {
    // Add data.
    Object.defineProperty(this, 'data', {
      value: (locales || []).map(locale => locale.toLowerCase()),
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

  default() {
    return getDefaultLocale(this.data);
  }

  translate(text, locale, translations) {
    return _translate(text, this.get(locale), translations);
  }
}

// Translate exports.
export const normalizeTranslations
  = Locales.normalizeTranslations
  = Locales.prototype.normalizeTranslations
  = _normalizeTranslations;

export const translate
  = Locales.translate
  = _translate;

// Default export.
export default Locales;