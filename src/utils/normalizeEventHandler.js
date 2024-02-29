'use strict';

import createStopPropagationFunc from './createStopPropagationFunc';

// Helper function to normalize an event handler.
const normalize = func => typeof func === 'function' && func || (
  typeof func === 'string' && (() => eval(func))
) || null;

// Helper function to normalize an event handler, whether it is natively
// a function or a string that needs to be evaluated 
const normalizeEventHandler = (func, stopPropagation) => (
  (func = normalize(func)) && stopPropagation && createStopPropagationFunc(func) || func
);

// Exports.
export default Object.freeze(Object.defineProperty(normalizeEventHandler, 'normalizeEventHandler', {
  value: normalizeEventHandler
}));