'use strict';

// Helper function to normalize an event handler, whether it is natively
// a function or a string that needs to be evaluated 
const normalizeEventHandler = func => typeof func === 'function' && func || (
  typeof func === 'string' && (() => eval(func))
) || null;

// Exports.
export default Object.freeze(Object.defineProperty(normalizeEventHandler, 'normalizeEventHandler', {
  value: normalizeEventHandler
}));