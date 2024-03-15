'use strict';

import Platform from '../core/native/Platform';
import normalizeEventHandler from './normalizeEventHandler';
import createFormData from './createFormData';

// Helper function to normalize press, release and move
// event handlers for both standard web and React/NextJS.
export const createEventHandlers = (handlers, options, defaultOutput) => {
  typeof handlers === 'function' && (handlers = {onPress: handlers});
  if (!handlers && defaultOutput) return defaultOutput;
  let {
    onMouseDown,
    onTouchStart = onMouseDown,
    onPress = onTouchStart,
    onLongMouseDown,
    onLongTouchStart = onLongMouseDown,
    onLongPress = onLongTouchStart,
    onMouseUp,
    onTouchEnd = onMouseUp,
    onRelease = onTouchEnd,
    onMouseMove,
    onTouchMove = onMouseMove,
    onMove = onTouchMove,
    onmousedown,
    ontouchstart = onmousedown,
    onpress = ontouchstart,
    onlongmousedown,
    onlongtouchstart = onlongmousedown,
    onlongpress = onlongtouchstart,
    onmouseup,
    ontouchend = onmouseup,
    onrelease = ontouchend,
    onmousemove,
    ontouchmove = onmousemove,
    onmove = ontouchmove,
    onSubmit,
    onsubmit,
    stopPropagation = true,
    ...output
  } = handlers || (handlers = {}),
  {
    delay = handlers.delay || ((onLongPress || onlongpress) && 500), // for long press
  } = options || {},
  timeoutId = -1, timeoutid = -1;
  // React NexJS event normalization.
  (onPress = normalizeEventHandler(onPress, stopPropagation)) && (output[Platform.onPressName] = onPress);
  (onRelease = normalizeEventHandler(onRelease, stopPropagation)) && (output[Platform.onReleaseName] = onRelease);
  (onMove = normalizeEventHandler(onMove, stopPropagation)) && (output[Platform.onMoveName] = onMove);
  (onSubmit = normalizeEventHandler(onSubmit)) && (output.onSubmit = event => {
    event.preventDefault();
    event.target.checkValidity();
    event.target.reportValidity();
    onSubmit(createFormData(event), event);
  });

  // Regular web event normalization.
  (onpress = normalizeEventHandler(onpress, stopPropagation)) && (output[Platform.onpressName] = onpress);
  (onrelease = normalizeEventHandler(onrelease, stopPropagation)) && (output[Platform.onreleaseName] = onrelease);
  (onmove = normalizeEventHandler(onmove, stopPropagation)) && (output[Platform.onmoveName] = onmove);
  (onsubmit = normalizeEventHandler(onsubmit)) && (output.onsubmit = event => {
    event.preventDefault();
    event.target.checkValidity();
    event.target.reportValidity();
    onsubmit(createFormData(event), event);
  });

  // Long press for React/NextJs.
  if (delay = Math.max(0, delay || 0)) {
    (onPress || (onPress = normalizeEventHandler(onLongPress, stopPropagation))) && (
      output[Platform.onPressName] = (...args) => {
        timeoutId = setTimeout(() => onPress && onPress(...args), delay);
      },
      output[Platform.onReleaseName] = (...args) => {
        clearTimeout(timeoutId);
        onRelease && onRelease(...args);
      }
    );

    // Long press for regular web.
    (onpress || (onpress = normalizeEventHandler(onlongpress, stopPropagation))) && (
      output[Platform.onpressName] = (...args) => {
        timeoutid = setTimeout(() => onpress && onpress(...args), delay);
      },
      output[Platform.onreleaseName] = (...args) => {
        clearTimeout(timeoutid);
        onrelease && onrelease(...args);
      }
    );
  }
console.log('Platform.onPressName', Platform.onPressName);
console.log('Platform.hasTouchScreen', Platform.hasTouchScreen);
  return output;
}

// Exports.
export default createEventHandlers;