import { useState, useEffect } from 'react';
import observe from './observe';

// Main hook.
export const useObserver = (obj, attr, onRefresh) => {
  if (obj && attr && obj.hasOwnProperty(attr) ) {
    let value = obj[attr], [state, setState] = useState(value);
    useEffect(() => {
      const refresh = typeof onRefresh === 'function' && (() => {
        (value = obj[attr]) !== state && onRefresh(value);
        console.log('REFRESH', state, value, value !== state, obj, attr, obj[attr]);
        setState(value);
      }) || (() => setState(obj[attr]));
      observe(obj, attr, refresh);

      console.log('OBSERVING', obj, attr, value, Object.getOwnPropertyDescriptor(obj, attr));
    }, []);
  }
}

// Default export.
export default useObserver;