import Store from './Store';
import observe from './observe';

// Hlper function to run post processes.
async function runPostProcesses() {
  if (this.readyToRun && !this.warehouse.isReady) {
    // Run post processes.
    try {
      for (let i = 0; i !== this.length; ++i) {
        await this[i].apply(this.warehouse, [this.warehouse]);
      }
    } catch (e) {
      throw console.error(e);
    } finally {
      this.warehouse.isReady = true;
    }
  }
}

// Class to store multiple stores.
class DataWarehouse {
  // To check if all the stores are ready and post processes done.
  isReady = false;

  // Constructor.
  constructor(...stores) {
    // Add observable for readyness.
    const postProcesses = [];
    postProcesses.readyToRun = false;
    postProcesses.warehouse = this;
    observe(postProcesses, 'readyToRun', runPostProcesses);

    // Find post processes and prune non-stores.
    let j = 0;
    for (let i = 0; i !== stores.length; ++i) {
      const store = stores[i];
      (store instanceof Store && (stores[j++] = store))
        || (typeof store === 'function' && postProcesses.push(store))
        || (stores[i] = null);
    }
    stores.length = j;

    // Add stores to data warehouse.
    Object.defineProperty(this, '__all__', {
      value: stores,
      configurable: false,
      writable: false,
      enumerable: false
    });

    // Add getters for stores and check which store is ready.
    const readyStores = new Set;
    for (let i = 0; i !== stores.length; ++i) {
      const store = stores[i];
      if (this[store.storageName]) {
        throw `ERROR: a store with a name ${store.name} or storage name ${store.storageName} already exists`;
      }

      // Add store name accessor.
      Object.defineProperty(this, store.name, {
        get() { return store; },
        configurable: false,
        enumerable: true
      });

      // Add additional accessor in case the store name is different than the storage name.
      store.name !== store.storageName && Object.defineProperty(this, store.storageName, {
        get() { return store; },
        configurable: false,
        enumerable: false
      });

      // Check which store is ready.
      observe(store, 'isReady', () => {
        (store.isReady && readyStores.add(i)) || readyStores.delete(i);
        postProcesses.readyToRun = readyStores.size === stores.length;
      });

      // If store is already ready.
      store.isReady && readyStores.add(i);
    }

    // If all stores are already ready.
    postProcesses.readyToRun = readyStores.size === stores.length;
  }

  // Helper function to clear the all persisting storages.
  clearStorage(...keys) {
    for (let i = 0; i !== this.__all__.length; ++i) this.__all__[i].clearStorage(...keys);
    return this;
  }
}

// Exports.
export default Object.freeze(Object.defineProperty(DataWarehouse, 'DataWarehouse', {
  value: DataWarehouse
}));