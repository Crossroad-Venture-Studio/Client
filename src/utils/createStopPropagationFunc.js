// Prevent event handlers to go beyond their immediate scope.
const createStopPropagationFunc = func => typeof func === 'function' && ((e, ...args) => {
  e.cancelBubble = true;
  e.stopPropagation();
  return func(e, ...args);
}) || null;

// Exports.
export default Object.freeze(Object.defineProperty(createStopPropagationFunc, 'createStopPropagationFunc', {
  value: createStopPropagationFunc
}));