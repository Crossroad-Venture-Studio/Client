import { useState, useEffect } from 'react';
import observe from '../../data/observe';
import '../../../utils/src/functionUtils';

// Main hook.
export function useObserver(obj, attr, onRefresh) {
  const valid = obj && attr && obj.hasOwnProperty(attr);
  let value = valid ? obj[attr] : null;
  const [state, setState] = useState(value);
  if (valid) {
    useEffect(() => {
      const refresh = typeof onRefresh === 'function' && (() => {
        const v = obj[attr];
        v !== state && onRefresh(v);
        setState(v);
      }) || (() => setState(obj[attr]));
      observe(obj, attr, refresh);
    }, []);
    return [state, v => obj[attr] = v];
  }

  return [state, setState];
}

// Default export.
export default useObserver;