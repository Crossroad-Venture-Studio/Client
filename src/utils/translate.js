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
    let k = key.toUpperCase(), t, t2;
    if(!output[k]) {
      t = output[key];
      t2 = output[k] = {};
      for (const l in t) t2[l] = t[l].toLowerCase();
    }
    k = key.toUpperCase();
    if(!output[k]) {
      t || (t = output[key]);
      t2 = output[k] = {};
      for (const l in t) t2[l] = t[l].toUpperCase();
    }
  }

  return output;
};

// Default export.
export default translate;