'use strict';

import Platform from '../core/native/Platform';
import normalizeEventHandler from './normalizeEventHandler';
import createFormData from './createFormData';

// Helper function to normalize press, release and move
// event handlers for both standard web and React/NextJS.
const createEventHandlers = (handlers, options, defaultOutput) => {
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
    ...output
  } = handlers || (handlers = {}),
  {
    delay = handlers.delay || ((onLongPress || onlongpress) && 500), // for long press
  } = options || {},
  timeoutId = -1, timeoutid = -1;
  // React NexJS event normalization.
  (onPress = normalizeEventHandler(onPress)) && (output[Platform.onPressName] = onPress);
  (onRelease = normalizeEventHandler(onRelease)) && (output[Platform.onReleaseName] = onRelease);
  (onMove = normalizeEventHandler(onMove)) && (output[Platform.onMoveName] = onMove);
  (onSubmit = normalizeEventHandler(onSubmit)) && (output.onSubmit = event => {
    event.preventDefault();
    event.target.checkValidity();
    event.target.reportValidity();
    onSubmit(createFormData(event), event);
  });

  // Regular web event normalization.
  (onpress = normalizeEventHandler(onpress)) && (output[Platform.onpressName] = onpress);
  (onrelease = normalizeEventHandler(onrelease)) && (output[Platform.onreleaseName] = onrelease);
  (onmove = normalizeEventHandler(onmove)) && (output[Platform.onmoveName] = onmove);
  (onsubmit = normalizeEventHandler(onsubmit)) && (output.onsubmit = event => {
    event.preventDefault();
    event.target.checkValidity();
    event.target.reportValidity();
    onsubmit(createFormData(event), event);
  });

  // Long press for React/NextJs.
  if (delay = Math.max(0, delay || 0)) {
    (onPress || (onPress = normalizeEventHandler(onLongPress))) && (
      output[Platform.onPressName] = (...args) => {
        timeoutId = setTimeout(() => onPress && onPress(...args), delay);
      },
      output[Platform.onReleaseName] = (...args) => {
        clearTimeout(timeoutId);
        onRelease && onRelease(...args);
      }
    );

    // Long press for regular web.
    (onpress || (onpress = normalizeEventHandler(onlongpress))) && (
      output[Platform.onpressName] = (...args) => {
        timeoutid = setTimeout(() => onpress && onpress(...args), delay);
      },
      output[Platform.onreleaseName] = (...args) => {
        clearTimeout(timeoutid);
        onrelease && onrelease(...args);
      }
    );
  }

  return output;
}

// Exports.
export default Object.freeze(Object.defineProperty(createEventHandlers, 'createEventHandlers', {
  value: createEventHandlers
}));