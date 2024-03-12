'use client';

import { useRef } from 'react';
import Overlay from './Overlay';
import Button from '../atoms/Button';

// Modal menu.
export const OverlayMenu = props => {
  // Get props and normalize input.
  let {
    rightNav = [],
    nav = rightNav,
    children,
    className,
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
    cancelable = true,
    hooks,
    ...other
  } = props || {},
  _ref = useRef(null),
  _onOpen = (...args) => {
    _ref && _ref.current && _ref.current.classList.add('opened');
    onOpen && onOpen(...args);
  },
  _onClose = (...args) => {
    _ref && _ref.current && _ref.current.classList.remove('opened');
    onClose && onClose(...args);
  };
  Array.isArray(children || (children = [])) || (children = [children]);
  nav || (nav = []);
  className = (className && `menu ${className}`) || 'menu';

  // Layout.
  return <Overlay
    opened={opened}
    onOpen={_onOpen}
    onClose={_onClose}
    onOpened={onOpened}
    onClosed={onClosed}
    hooks={hooks}
    cancelable={cancelable}
  >
    {(nav.length || children.length) && <div
      className={className}
      ref={_ref}
      {...other}
    >
      {...(nav.map(({src, icon, iconSrc, ...other} = {}, i) => <Button {...other} key={`${i}`}></Button>))}
      {...children}
    </div> || null}
  </Overlay>;
}

// Exports.
export default OverlayMenu;