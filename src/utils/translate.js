// Helper function to translate.
export const translate = (text, locale, translations) => (
  ((translations || {})[text] || {})[locale] || text
);

// Helper function to augment translations.
export const normalizeTranslations = translate.normalizeTranslations = (
  translations,
  output
) => {
  output = Object.assign(output || {}, translations || (translations = {}));

  // Augment with casing.
  for (const key in translations) {
    let k = key.toLowerCase(), t, t2;
    if(!translations[k]) {
      t = translations[key];
      t2 = output[k] = {};
      for (const l in t) t2[l] = t[l].toLowerCase();
    }
    k = key.toUpperCase();
    if(!translations[k]) {
      t || (t = translations[key]);
      t2 = output[k] = {};
      for (const l in t) t2[l] = t[l].toUpperCase();
    }
  }

  return output;
};

// Default export.
export default translate;