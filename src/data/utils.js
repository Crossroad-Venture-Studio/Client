import '../../utils/src/objectUtils';

// Helper function to get a storage.
export const getStorage = storage => storage || (window && window.localStorage);

// Helper function to get and normalize store name.
export const getStoreName = name => {
  if (typeof name === 'undefined' || name === null) {
    return '';
  }
  name = name.toString().replace(/(\.json|\.txt|\.bin)($|\.)/g, '$2').split('/').slice(-1)[0];
  const strs = name.split(/[^a-zA-Z1-9]+/g);
  if (!strs || !strs.length || (strs.length === 1 && !strs[0])) {
    return '';
  }
  let i = !strs[0] ? 1 : 0;
  let str = strs[i];
  let out = str.charAt(0).toLowerCase() + str.slice(1);
  for (++i; i != strs.length; ++i) {
    str = strs[i];
    if (!str) continue;
    out += str.charAt(0).toUpperCase() + str.slice(1);
  }
  return out || '';
}

// Helper function to get the data of store property.
export const getData = (obj, key, sep = '.') => {
  let arr = (typeof key === 'string' && key.split(sep)) || (Array.isArray(key) && key);
  if (!arr) return undefined;
  for (let i = 0; i !== arr.length && obj; ++i) obj = obj[arr[i]];
  return obj;
}

// Helper function to set the value of store property.
export const setData = (data, obj, key, sep = '.') => {
  let arr = (typeof key === 'string' && key.split(sep)) || (Array.isArray(key) && key);
  let i = 0;
  obj = obj || {};
  for (let ie = arr.length - 1; i !== ie; ++i) {
    const k = arr[i];
    obj = obj[k] = obj[k] || {};
  }
  return (obj || {})[arr[i]] = data;
}

// Helper function to get the key for the property to store on the persisting storage.
export const getStorageKey = (storeName, storeKey = '') => `${storeName}|${storeKey}`;

// Helper function to get a store keys.
export const getStorageKeys = (storage, storeName, removePrefix = true) => {
  if (!storage || (storage = window.localStorage)) return [];
  const output = [], s = storeName && getStorageKey(storeName) || '';
  if (typeof storage.key === 'function') {
    for ( let i = 0, l = storage.length, key; i !== l; ++i ) {
      key = storage.key(i);
      (!s || key.startsWith(s)) && output.push(removePrefix && key.replace(s, '') || key);
    }
  } else {
    for (const key in storage) {
      (!s || key.startsWith(s)) && output.push(removePrefix && key.replace(s, '') || key);
    }
  }
  return output;
}

// Helper function to read some data from the storage.
export const readData = (
  storeName,
  storeKey,
  decode = 'stringify',
  storage
) => {
  const _data = (storage = getStorage(storage)) && storage.getItem && storage.getItem(getStorageKey(storeName, storeKey)) || null,
    _decode = (typeof decode === 'function' && decode)
    || (decode === 'stringify-object' && Object.from)
    || (decode && (data => JSON.parse(data)));
  return _decode ? (
  (_decode === Object.from && (_data === null || _data === undefined) && {})
    || _decode(_data)
  ) : _data;
}

// Helper function to write some data on the storage.
export const writeData = (
  data,
  storeName,
  storeKey,
  encode = 'stringify',
  storage
) => (
  data !== null && data !== undefined ?
  (storage = getStorage(storage)) && storage.setItem && storage.setItem(
    getStorageKey(storeName, storeKey),
    (encode && ( // encode if needed.
      typeof encode === 'function' ?
      encode(data) // use encode function
      : encode === 'stringify-object' ? ( // stringify on object
        (typeof data === 'object' && JSON.stringify(data || {}))
        || data
      ) : JSON.stringify(data === undefined ? null : data) // stringify all
    )) || data
  )
  : (storage = getStorage(storage)) && storage.removeItem && storage.removeItem(
    getStorageKey(storeName, storeKey)
  ) // remove item if data is null or undefined.
);

// Helper functions to get persist schema keys.
const getPersistingKeysFromObj = (obj, prefix = '', sep = '.', output = {}) => {
  !obj && (obj = {});
  for (let key in obj) {
    const data = obj[key];
    !data
      || ((Array.isArray(data) || typeof data !== 'object') && (output[prefix + key] = true))
      || getPersistingKeysFromObj(data, prefix + key + sep, sep, output);
  }
  return output;
};

const _getPersistingKeys = (keys, prefix = '', sep = '.', output = {}) => {
  for (let i = 0; i !== keys.length; ++i) {
    const key = keys[i];
    (Array.isArray(key) && key.length && _getPersistingKeys(key, prefix, sep, output))
    || key === undefined || key === null
    || (typeof key === 'object' && getPersistingKeysFromObj(key, prefix, sep, output))
    || (output[key.toString()] = true);
  }
  return output;
}

export const getPersistingKeys = (...keys) => Object.keys(_getPersistingKeys(keys));