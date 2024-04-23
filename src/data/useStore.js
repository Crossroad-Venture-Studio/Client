import { useState, useEffect } from 'react';

// Main hook.
export const useStore = store => {
  const [state, setState] = useState();
  useEffect(() => {
    setState(store);
  }, []);

  return [state, setState];
}

// Default export.
export default useStore;