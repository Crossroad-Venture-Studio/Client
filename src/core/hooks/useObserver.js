'use client';

import { useState, useEffect } from 'react';
import observe from '../../data/observe';
import '../../../utils/src/functionUtils';
import useForceUpdate from './useForceUpdate';

// Main hook.

export function useObserver(obj, attr, onRefresh) {
  const valid = obj && attr && obj.hasOwnProperty(attr),
    value = valid ? obj[attr] : null,
    setValue = valid && (v => obj[attr] = v) || Function.identity;
  useEffect(() => {
    valid && observe(obj, attr, typeof onRefresh === 'function' && (() => {
      const v = obj[attr];
      v !== value && (
        onRefresh(v),
        forceUpdate()
      );
    }) || (() => v !== value && forceUpdate()));
  }, []);
  return [value, setValue];
}

// export function useObserver(obj, attr, onRefresh) {
//   const valid = obj && attr && obj.hasOwnProperty(attr);
//   let value = valid ? obj[attr] : null;

//   return [value, v => obj[attr] = v];

//   // const [state, setState] = useState(value);
//   const forceUpdate = useForceUpdate();

//   useEffect(() => {
//     const refresh = typeof onRefresh === 'function' && (() => {
//       const v = obj[attr];
//       v !== value && onRefresh(v);
//       forceUpdate();
//     }) || (() => forceUpdate());
//     observe(obj, attr, refresh);
//   }, []);

//   return [value, v => obj[attr] = v];

//   useEffect(() => {
//     // const refresh = typeof onRefresh === 'function' && (() => {
//     //   const v = obj[attr];
//     //   v !== state && onRefresh(v);
//     //   setState(v);
//     //   forceUpdate();
//     // }) || (() => setState(obj[attr]));
//     const refresh = () => {
//       setState(obj[attr])
//     };
//     observe(obj, attr, refresh);
//   }, []);
//   return [state, v => {
//     // setState(obj[attr] = v);
//   }];

//   return [state, setState];

//   useEffect(() => {
//     const refresh = typeof onRefresh === 'function' && (() => {
//       const v = obj[attr];
//       v !== state && onRefresh(v);
//       setState(v);
//       forceUpdate();
//     }) || (() => setState(obj[attr]));
//     observe(obj, attr, refresh);
//   }, []);
//   return [state, v => obj[attr] = v];

//   // if (valid) {
//   //   useEffect(() => {
//   //     const refresh = typeof onRefresh === 'function' && (() => {
//   //       const v = obj[attr];
//   //       v !== state && onRefresh(v);
//   //       setState(v);
//   //       forceUpdate();
//   //     }) || (() => setState(obj[attr]));
//   //     observe(obj, attr, refresh);
//   //   }, []);
//   //   return [state, v => obj[attr] = v];
//   // }

//   // return [state, setState];
// }

// Default export.
export default useObserver;