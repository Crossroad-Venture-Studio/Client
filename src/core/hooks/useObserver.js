'use client';

import { useEffect } from 'react';
import observe from '../../data/observe';
import '../../../utils/src/functionUtils';
import useForceUpdate from './useForceUpdate';

// Main hook.
export function useObserver(obj, attr, onRefresh) {
  const valid = obj && attr && obj.hasOwnProperty(attr),
    value = valid ? obj[attr] : null,
    setValue = valid && (v => obj[attr] = v) || Function.identity,
    forceUpdate = useForceUpdate();
  useEffect(() => {
    valid && observe(obj, attr, typeof onRefresh === 'function' && (() => {
      onRefresh(obj[attr]);
      forceUpdate();
    }) || (() => forceUpdate()));
  }, []);
  return [value, setValue];
}

// Default export.
export default useObserver;