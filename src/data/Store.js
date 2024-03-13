import {
  getStoreName,
  getPersistingKeys,
  readData,
  writeData,
  getStorageKey,
  getStorageKeys,
  getStorage
} from './utils';
import observe from './observe';

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
    storage,
    encode = 'stringify',
    decode = 'stringify',
    loadFromStorage,
    clearStorage = [] // Clear local storage at initialization,
                      // true, false or a list of keys to delete
  } = {}) {

    // Add store name.
    defineReadOnlyProp(this, 'name', storeName);
    defineReadOnlyProp(this, 'storageName', getStoreName(storeName));

    // Add store storage.
    Object.defineProperty(this, 'storage', {
      get() { return getStorage(storage); },
      enumerable: true
    })

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

    // Normalize input.
    loadFromStorage === true && (
      (persisting === true || (Array.isArray(persisting) && persisting[0] === true))
      && (
        persisting = Array.isArray(persisting) && persisting.unshift() || [],
        loadFromStorage = { persisting: true }
      ) || (Array.isArray(persisting) && (loadFromStorage = persisting.map(x => [x, true])))
    );

    // Add persisting keys.
    persisting = getPersistingKeys(persisting);
    for (let i = 0, l = persisting.length; i !== l; ++i) this.makePersist(persisting[i]);

    // Load from storage.
    if (loadFromStorage) this.loadFromStorage(loadFromStorage);
  }

  // Helper function to clear the persisting storage.
  clearStorage(...keys) {
    keys = keys.flat(Infinity);
    if (keys[0]) {
      // Case where input parameter is true: clear all.
      typeof keys[0] !== 'string' && (keys = this.getStorageKeys());

      // Clear all keys.
      for (let i = 0, l = keys.length; i !== l; ++i) {
        this.storage.removeItem(getStorageKey(this.storageName, keys[i]));
      }
      return this;
    }

    // Case where input parameter is false.
    if (keys.length) return this;

    // Case where no input parameters is specified, same as clear all.
    keys = this.getStorageKeys(false);
    for (let i = 0, l = keys.length; i !== l; ++i) {
      this.storage.removeItem(keys[i]);
    }
    return this;
  }
  clearEntireStorage() {
    this.storage.clear();
    return this;
  }

  // Helper function to clear the data.
  clearData(...keys) {
    keys = keys.flat(Infinity);
    if (keys[0]) {
      // Case where input parameter is true: clear all.
      if (typeof keys[0] !== 'string') {
        for (const key in this.data) delete this.data[key];
        return this;
      }

      // Clear all keys.
      for (let i = 0; i !== keys; ++i) {
        delete this.data[keys[i]];
      }
      return this;
    }

    if (keys.length) return this;

    // Case where no input parameters is specified, same as clear all.
    for (const k in this.data) delete this.data[k];
    return this;
  }

  // Helper function to clear all.
  clear(...keys) {
    return this.clearStorage(...keys).clearData(...keys);
  }

  // Helper function to load data.
  loadData(data) {
    if (typeof (data || (data = {})) !== 'object') return this;
    for (const key in data) {
      this.data[key] = data[key];
    }
    return this;
  }

  // Helper function to get the storageKeys.
  getStorageKeys(removePrefix = true) { return getStorageKeys(this.storage, this.storageName, removePrefix); }

  // Helper function to load data from storage.
  loadFromStorage(...keys) {
    keys = keys.flat(Infinity);
    let storageKeys = this.getStorageKeys(), j = 0, persists, _keys = [];
    for (let i = 0, l = keys.length, v; i !== l; ++i) {
      v = keys[i];
      if (typeof v === 'string') {
        keys[j++] = v;
      } else if (!v) return this;
      else if (typeof v === 'object') {
        const {
          persisting,
          makePersist = persisting,
          makePersistAll = makePersist,
          keys
        } = v;
        persists = persists || makePersistAll;
        Array.isArray(keys) && keys.length && (_keys = _keys.concat(keys));
      }
    }
    keys.length = j;
    keys = keys.concat(_keys).map(x => typeof x !== 'object' && [x, persists ] || (Array.isArray(x) && x) || [x.name || x.key, x.persists]);
    if (keys.length && keys[0] === 'string') {
      keys = new Map(keys);
      storageKeys = storageKeys.filter(x => keys.has(x));
    }
    
    for (let i = 0, l = storageKeys.length, k, p; i !== l; ++i) {
      k = storageKeys[i];
      if (keys.size && (p = keys.get(k)) || (p === undefined && persists)) this.makePersist(k);
      else this.data[k] = readData(this.storageName, k, this.decode, this.storage);
    }
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
      if (initFromStorage) {
        const d = readData(this.storageName, persistingKey, this.decode, this.storage);
        if ((d === undefined || d === null) && val !== undefined && val !== null) {
          // Update storage if necessary.
          writeData(val, this.storageName, persistingKey, this.encode, this.storage);
        } else obj[subKey] = d;
      } else writeData(val, this.storageName, persistingKey, this.encode, this.storage);
    } catch (e) {
      console.error(e);
    }

    // Create observable.
    observe(obj, subKey,
      v => writeData(v, this.storageName, persistingKey, this.encode, this.storage)
    );
    return this;
  }

  // Persist all direct keys.
  makePersistAll(initFromStorage = true) {
    for (const key in this.data) this.makePersist(key, initFromStorage);
    return this;
  }

  // Check if a key persists.
  persists(key) { return this.getStorageKeys().findIndex(key) >= 0; }
};

// Exports.
export default Store;