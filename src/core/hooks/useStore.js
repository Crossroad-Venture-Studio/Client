import { useState, useEffect } from 'react';

// Main hook.
export const useStore = (store, onStoreInit) => {
  const [state, setState] = useState();
  useEffect(() => {
    typeof onStoreInit === 'function' && onStoreInit(store);
    console.log('STORE useEffect');
    setState(store);
  }, []);

  console.log('STORE state', state);

  return [state, setState];
}

// Default export.
export default useStore;