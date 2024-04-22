import { useState, useEffect } from 'react';
import observe from './observe';

// Main hook.
export const useObserver = (obj, attr, onRefresh) => {
  if (obj && attr && obj.hasOwnProperty(attr) ) {
    const value = obj[attr], [state, setState] = useState(value);
    useEffect(() => {
      const refresh = typeof onRefresh === 'function' && (() => {
        value !== state && onRefresh(props);
        setState(value);
      }) || (() => setState(obj[attr]));
      observe(obj, attr, refresh);
    }, []);
  }
}

// Default export.
export default useObserver;