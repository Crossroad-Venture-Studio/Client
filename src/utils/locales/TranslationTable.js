import '../../../utils/src/stringUtils';

// Helper functions to normalize inputs.
const spRe = /\s+/g,
normalizeText = text => {
  typeof text === 'number' || text || (text = '');
  typeof text === 'string' || (text = `${text}`);
  return text.trim().replace(spRe, ' ');
}, normalizeLocale = locale => (locale || '').toLowerCase();

// Main class.
export class TranslationTable {
  constructor (...translations) {
    // Define the table.
    const table = translations.flat(1);
    Object.defineProperty(this, 'table', {
      value: table
    });

    // Create map, and normalize table.
    const map = new Map;
    Object.defineProperty(this, 'map', {
      value: map
    });
    for (let i = 0, l = table.length, t, s, o; i !== l; ++i) {
      t = table[i];
      o = {};

      for (const locale in t) {
        s = o[normalizeLocale(locale)] = normalizeText(t[locale]);
        map.set(s, [i]);

        // Lower case.
        map.set(s.toLowerCase(), [i, 'toLowerCase']);

        // Upper case.
        map.set(s.toUpperCase(), [i, 'toUpperCase']);

        // Title case.
        map.set(s.toTitleCase(), [i, 'toTitleCase']);

        // Capital case.
        map.set(s.toCapitalCase(), [i, 'toCapitalCase']);
      }

      table[i] = o;
    }
  }

  // Translate a text.
  translate(text, locale = 'en') {
    // Normalize input.
    text = normalizeText(text);
    locale = normalizeLocale(locale);
    let [index, transform] = this.map.get(text) || [], s;

    // Return translation.
    return index !== undefined && (s = this.table[index][locale]) !== undefined && (
      transform && s[transform] || s
    ) || text;
  }
}

export const createTranslationTable
  = TranslationTable.create
  = (...args) => new TranslationTable(...args);

// Default export.
export default Object.freeze(TranslationTable);