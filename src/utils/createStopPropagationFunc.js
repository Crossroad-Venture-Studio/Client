'use strict';

import stopPropagationEventHandler from './stopPropagationEventHandler';

// Prevent event handlers to go beyond their immediate scope.
export const createStopPropagationFunc = func => typeof func === 'function' && ((event, ...args) => {
  stopPropagationEventHandler(event);
  return func(event, ...args);
}) || null;

// Exports.
export default createStopPropagationFunc;