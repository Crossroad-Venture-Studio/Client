import createEventHandlers from './createEventHandlers';
import createStopPropagationFunc from './createStopPropagationFunc';
import normalizeEventHandler from './normalizeEventHandler';
import color from './color';

// Exports.
export default {
  createEventHandlers,
  createStopPropagationFunc,
  normalizeEventHandler,
  ...color
}