'use client';

import { useRef } from 'react';
import { Overlay, TRANSITION_TIME as TT } from './Overlay';
import Button from '../atoms/Button';
import { useState } from 'react';

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

  // Additional states.
  const [isOpened, setIsOpened] = useState(opened);

  // Layout.
  return <Overlay
    opened={opened}
    onOpen={_onOpen}
    onClose={_onClose && (() => { _onClose(); setIsOpened(false); }) || (() => setIsOpened(false))}
    onOpened={onOpened && (() => { onOpened(); setIsOpened(true); }) || (() => setIsOpened(true))}
    onClosed={onClosed}
    hooks={hooks}
    cancelable={cancelable}
  >
    {(nav.length || children.length) && <div
      className={className}
      ref={_ref}
      {...other}
    >
      {...(nav.map(({src, icon, iconSrc, ...other} = {}, i) => <Button disabled={!isOpened} {...other} key={`${i}`}></Button>))}
      {...children}
    </div> || null}
  </Overlay>;
}

// Exports.
export const TRANSITION_TIME =  TT;
Object.defineProperty(OverlayMenu, 'TRANSITION_TIME', {value: TRANSITION_TIME});
export default OverlayMenu;