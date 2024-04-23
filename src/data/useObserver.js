import { useState, useEffect } from 'react';
import observe from './observe';
import '../../utils/src/functionUtils';

// Main hook.
export const useObserver = (obj, attr, onRefresh) => {
  if (obj && attr && obj.hasOwnProperty(attr) ) {
    let value = obj[attr];
    const [state, setState] = useState(value);
    useEffect(() => {
      const refresh = typeof onRefresh === 'function' && (() => {
        (value = obj[attr]) !== state && onRefresh(value);
        setState(value);
      }) || (() => setState(obj[attr]));
      observe(obj, attr, refresh);
    }, []);
    return [state, value => obj[attr] = value];
  }

  return [null, Function.void];
}

// Default export.
export default useObserver;