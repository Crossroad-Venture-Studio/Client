// Helper functions to get a locale index.
const wrapIndex = (i, locales, len = locales.length) => (
  (i + len) % len
),
getIndex = (i, locales) => wrapIndex(typeof i === 'string' && (
  i = i.toLowerCase(),
  Math.max(locales.findIndex(v => v === i), 0)
) || (typeof i === 'number' && i) || 0, locales);

// Helper function to get the next locale.
export const nextLocale = (index, locales) => (
  (locales || (locales = []))[wrapIndex(getIndex(index, locales) + 1, locales)]
);

// Helper function to get the previous locale.
export const previousLocale = (index, locales) => (
  (locales || (locales = []))[wrapIndex(getIndex(index, locales) - 1, locales)]
);

// Helper function to get a locale.
export const getLocale = (input, locales) => (
  (locales || (locales = []))[getIndex(input, locales)]
);

// Helper function to get the default locale (the first one).
export const getDefaultLocale = locales => (
  (locales || [])[0]
);