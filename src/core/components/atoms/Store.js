import { createContext, useContext } from 'react';
import useStore from '../../hooks/useStore';

export const StoreContext =  createContext(null);
export const useStoreContext = (context = StoreContext) => useContext(context);

// Main component.
export const Store = props => {
  const {
    store: _store,
    initStore,
    onStoreInit = initStore,
    children
  } = props || {};

  const [store] = useStore(_store, onStoreInit);

  // Render.
  return store && (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  ) || null;
}

// Additional exports.
Object.defineProperty(Store, 'Context', {
  value: StoreContext
});
Object.defineProperty(Store, 'useContext', {
  value: useStoreContext
});

// Default exports.
export default Store;