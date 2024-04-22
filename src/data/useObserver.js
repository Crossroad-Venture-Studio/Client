import { useState, useEffect } from 'react';
import observe from './observe';

// Main hook.
export const useObserver = (obj, attr, onRefresh) => {
  if (obj && attr && obj.hasOwnProperty(attr) ) {
    const value = obj[attr], [state, setState] = useState(value);
    useEffect(() => {
      const refresh = typeof onRefresh === 'function' && (() => {
        value !== state && onRefresh(value);
        console.log('REFRESH');
        setState(value);
      }) || (() => setState(obj[attr]));
      observe(obj, attr, refresh);

      console.log('OBSERVING', obj, attr, value, Object.getOwnPropertyDescriptor(obj, attr));
    }, []);
  }
}

// Default export.
export default useObserver;