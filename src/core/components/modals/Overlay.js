'use client';

import { useRef, forwardRef } from 'react';
import createEventHandlers from '../../../utils/createEventHandlers';
import '../../../../utils/src/functionUtils';

// Modal overlay.
export const Overlay = forwardRef((props, ref) => {
  // Get props and normalize input.
  let {
    className,
    children,
    open,
    opened = open,
    onOpenStart,
    onOpen = onOpenStart,
    onOpenEnd,
    onOpened = onOpenEnd,
    onDismiss,
    onCloseStart = onDismiss,
    onClose = onCloseStart,
    onCloseEnd,
    onClosed = onCloseEnd,
    cancelable,
    hooks,
    translate,
    title,
    safearea,
    ...other
  } = props || {}, _ref = null;
  className = (className && `overlay ${className}`) || 'overlay';
  safearea && (className = `${className} safearea`);
  cancelable && (className = `cancelable ${className}`);  
  opened && (className += ' opened');
  opened && (other.open = true);
  Array.isArray(children || (children = [])) || (children = [children]);
  typeof translate === 'function' || (translate = Function.identity);
  title = translate(title || 'Click here to close the window');

  // Fill hooks.
  // Hooks are functions that allow control from external components.
  if (hooks) {
    _ref = ref || useRef(null);

    // Status functions.
    hooks.isOpened = () => _ref.current && _ref.current.open;
    hooks.isClosed = () => _ref.current && !_ref.current.open;

    // Open function.
    hooks.open = async (cb) => new Promise((resolve, reject) => {
      // If the modal ref is not available or processed yet.
      if (!(_ref && _ref.current && _ref.current.showModal)) {
        reject && reject(Error('modal ref to dialog not ready yet'));
        return false;
      }

      // If the modal is already opened.
      if (_ref.current.open) {
        reject && reject(Error('modal already opened'));
        return false;
      }

      // The ref is available and the modal is closed.
      _ref.current.showModal();
      return setTimeout(() => {
        _ref.current.classList.add('display');
        setTimeout(() => {
          _ref.current.classList.add('opened');
          onOpen && onOpen(_ref.current);
          (resolve || onOpened || cb) && setTimeout(() => {
            resolve && resolve(_ref.current);
            onOpened && onOpened(_ref.current);
            cb && cb(_ref.current);
          }, 300); // end of animation.
        }, 10);
      }, 30); // add a mini delay to make sure showModal is done.
    });

    // Close function.
    hooks.close = async (cb) => new Promise((resolve, reject) => {
      // If the modal ref is not available or processed yet.
      if (!(_ref && _ref.current && _ref.current.close)) {
        reject && reject(Error('modal ref to dialog not ready yet'));
        return false;
      }

      // If the modal is already closed.
      if (!_ref.current.open) {
        reject && reject(Error('modal already closed'));
        return false;
      }
      
      // The ref is available and the modal is opened.
      _ref.current.classList.remove('opened');
      // if (document && document.activeElement && document.activeElement.blur) {
      //   document.activeElement.blur();
      // }
      onClose && onClose(_ref.current);
      return setTimeout(() => {
        _ref.current && (
          _ref.current.classList.remove('display'),
          _ref.current.close() // close after animation.
        );
        resolve && resolve(_ref.current);
        onClosed && onClosed(_ref.current);
        cb && cb(_ref.current);
      }, 300); // end of animation.
    });

    // Closing the modal by taping in the background.
    cancelable && Object.assign(other, createEventHandlers({onPress: (
      event => _ref && event.target === _ref.current && hooks.close()
    )}));

    // Access to current.
    Object.defineProperty(hooks, 'current', {
      get() { return _ref.current; },
      configurable: true
    });
  }
  
  // The output dialog.
  return <dialog
    ref={_ref}
    className={className}
    title={title}
    {...other}
  >
    {...children}
  </dialog>
});

// Exports.
export const TRANSITION_TIME = 300;
Object.defineProperty(Overlay, 'TRANSITION_TIME', {value: TRANSITION_TIME});
export default Overlay;