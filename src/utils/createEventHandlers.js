import Platform from '../core/native/Platform';
import normalizeEventHandler from './normalizeEventHandler';

// Helper function to normalize press, release and move
// event handlers for both standard web and React/NextJS.
const createEventHandlers = (handlers, options) => {
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

  // Regular web event normalization.
  (onpress = normalizeEventHandler(onpress)) && (output[Platform.onpressName] = onpress);
  (onrelease = normalizeEventHandler(onrelease)) && (output[Platform.onreleaseName] = onrelease);
  (onmove = normalizeEventHandler(onmove)) && (output[Platform.onmoveName] = onmove);

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