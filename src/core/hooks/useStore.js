import { useState, useEffect } from 'react';

// Main hook.
export const useStore = (store, onStoreInit) => {
  const [state, setState] = useState();
  useEffect(() => {
    typeof onStoreInit === 'function' && onStoreInit(store);
    setState(store);
  }, []);

  return [state, setState];
}

// Default export.
export default useStore;