// Helper function to translate.
export const translate = (text, locale, translations) => (
  ((translations || {})[text] || {})[locale] || text
);

// Helper function to augment translations.
export const normalizeTranslations = translate.normalizeTranslations = (
  translations,
  output
) => {
  translations || (translations = {});
  output || (output = {});

  // Normalize locales.
  for (const key in translations) {
    const t = translations[key], t2 = output[key] = {};
    for (const l in t) t2[l.toLowerCase()] = t[l];
  }

  // Augment with casing.
  for (const key in output) {
    // Lowecase.
    let k = key.toUpperCase(), t, t2;
    if(!output[k]) {
      t = output[key];
      t2 = output[k] = {};
      for (const l in t) t2[l] = t[l].toLowerCase();
    }

    // Uppercase.
    k = key.toUpperCase();
    if(!output[k]) {
      t || (t = output[key]);
      t2 = output[k] = {};
      for (const l in t) t2[l] = t[l].toUpperCase();
    }
  }

  return output;
};

export class TranslationTable {
  constructor (...translations) {
    // Define the table.
    const table = translations.flat(1);
    Object.defineProperty(this, 'table', {
      value: table
    });

    // Create map.
    const map = new Map;
    Object.defineProperty(this, 'map', {
      value: map
    });
    for (let i = 0, l = table.length; i !== l; ++i) {
      
    }

  }
}

// Helper function to create a translation table.
export const createTranslationMap = (...args) => {
  const output = args.flat(1).reduce((map, c) => {
    c || (c = {});
    for (const k in c) {
      map.set(k, )
    }
    return map;
  }, new Map);

}

// Default export.
export default translate;