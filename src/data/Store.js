import {
  getStoreName,
  getPersistingKeys,
  readData,
  writeData
} from './utils';

import observe from './observe';

import {
  defaultStorage,
  defaultStorageEncode,
  defaultStorageDecode
} from '../core/native/Platform';

// Helper function to define a non configurable read-only prop on an object.
const defineReadOnlyProp = (obj, key, value) => Object.defineProperty(obj, key, {
  value: value,
  configurable: false,
  writable: false,
  enumerable: true
});

// Helper function to load data.
async function asyncLoad(store, funcs, data, postProcesses) {
  // If single function passed.
  !Array.isArray(funcs) && (funcs = [funcs]);

  // Normalize callback functions to loading process.
  !Array.isArray(postProcesses) && (postProcesses = [ postProcesses ]);
  postProcesses = postProcesses.flat(Infinity).filter(p => typeof p === 'function');

  // Filter out non-functions.
  let l = 0, fn, responses = [], i = 0;
  for (; i !== funcs.length; ++i) {
    (fn = funcs[i]) && typeof fn === 'function' && (funcs[l++] = fn);
  }
  funcs.length = l;

  // No additional data to load.
  if (!funcs.length) {
    // Run post processes.
    try {
      const params = [store];
      for (i = 0, l = postProcesses.length; i !== l; ++i) {
        await postProcesses[i].apply(store, params);
      }
    } catch (e) {
      throw console.error(e);
    } finally {
      store.isReady = true;
      return 0;
    }
  }
  
  // Get data.
  try {
    responses = await Promise.all(funcs.map(fn => fn(data)));
  } catch (e) {
    throw console.error(e);
  } finally {
    // Collect data loading responses, and update data if needed.
    for (i = 0, l = responses.length; i !== l; ++i) {
      const res = responses[i];
      res && typeof res === 'object' && (data = Object.assign(data, res));
    }

    // Run post processes.
    try {
      const params = [store];
      for (i = 0, l = postProcesses.length; i !== l; ++i) {
        await postProcesses[i].apply(store, params);
      }
    } catch (e) {
      throw console.error(e);
    }

    store.isReady = true;
    return responses.length;
  }
}

// Base class store.
export class Store {
  // True when the store is ready.
  isReady = false;

  // Constructor.
  constructor(
    storeName = '', {
    _ = {},
    data = _,
    load = null,
    dataLoadingFuncs = load,
    onLoaded = [],
    onloaded = onLoaded,
    postProcesses = onloaded,
    persists = [],
    persisting = persists,
    storage = defaultStorage,
    encode = defaultStorageEncode,
    decode = defaultStorageDecode,
    clearStorage = [] // Clear local storage at initialization,
                      // true, false or a list of keys to delete
  } = {}) {

    // Add store name.
    defineReadOnlyProp(this, 'name', storeName);
    defineReadOnlyProp(this, 'storageName', getStoreName(storeName));

    // Add store storage.
    defineReadOnlyProp(this, 'storage', storage);

    // Add encode function for the storage.
    defineReadOnlyProp(this, 'encode', encode);

    // Add decode function for the storage.
    defineReadOnlyProp(this, 'decode', decode);

    // Clear storage if needed.
    ((typeof clearStorage === 'string' || typeof clearStorage === 'boolean') && this.clearStorage(clearStorage))
      || (clearStorage.length && clearStorage[0] && this.clearStorage(...clearStorage));

    // Add / load store data.
    data = (data && Object.deepCopy(data)) || {};
    if (typeof data !== 'object' || Array.isArray(data)) {
      const type = (Array.isArray(data) && 'array') || typeof data;
      throw `ERROR: data must be a non-array object instead of ${type}`;
    }
    asyncLoad(this, dataLoadingFuncs, data, postProcesses);
    defineReadOnlyProp(this, 'data', data);
    defineReadOnlyProp(this, 'defaultData', data); // init data.

    // Add _ getter for data.
    Object.defineProperty(this, '_', {
      get() { return data; },
      configurable: false,
      enumerable: false
    });

    // Add persisting keys.
    persisting = getPersistingKeys(persisting);
    for (let i = 0, l = persisting.length; i !== l; ++i) this.makePersist(persisting[i]);
  }

  // Helper function to clear the persisting storage.
  clearStorage(...keys) {
    keys = keys.flat(Infinity);
    if (keys[0]) {
      // Case where input parameter is true: clear all.
      if (typeof keys[0] !== 'string') {
        this.storage.clear();
        return this;
      }

      // Clear all keys.
      for (let i = 0; i !== keys; ++i) {
        for (let k in this.storage) k.includes(keys[i]) && this.storage.removeItem(k);
      }
      return this;
    }

    if (keys.length) return this;

    // Case where no input parameters is specified, same as clear all.
    this.storage.clear();
    return this;
  }

  // Helper function to make a key persist.
  makePersist(persistingKey, initFromStorage = true) {
    // Split key into a chain of sub-keys.
    const subKeys = persistingKey.split('.');

    // Get the object at the last - 1 subkey.
    let subKey = subKeys[0], obj = this.data;
    for (let k = 1, l = subKeys.length; k !== l; ++k) {
      obj = obj[subKey] = obj[subKey] || {};
      subKey = subKeys[k];
    }

    // Get the value at the last sub-key.
    const val = obj[subKey];

    // Get data from storage.
    try {
      let d;
      if (initFromStorage) {
        d = readData(this.storageName, persistingKey, this.decode, this.storage);
        if ((d === undefined || d === null) && val !== undefined && val !== null) {
          // Update storage if necessary.
          d = val;
          writeData(d, this.storageName, persistingKey, this.encode, this.storage);
        } else obj[subKey] = d;
      } else d = val;
    } catch (e) {
      console.error(e);
    }

    // Create observable.
    observe(obj, subKey,
      v => writeData(v, this.storageName, persistingKey, this.encode, this.storage)
    );
  }
};

// Exports.
export default Store;