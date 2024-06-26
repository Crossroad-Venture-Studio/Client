'use client';

import { useRef, useState } from 'react';
import { Overlay, TRANSITION_TIME as TT } from './Overlay';
import Button from '../atoms/Button';
import transitions from '../navigation/TransitionPage/transitions';
import '../../../../utils/src/functionUtils';

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
    closeIconSrc = 'https://crossroad-venture-studio.github.io/Design-System/icons/actions/close-filled-dark.svg',
    closeIcon = closeIconSrc,
    closeSrc = closeIcon,
    translate,
    ...other
  } = props || {},
  _ref = useRef(null),
  _onOpen = (...args) => {
    setTimeout(() => {
      _ref && _ref.current && _ref.current.classList.add('opened');
      onOpen && onOpen(...args);
    }, 1);
  },
  _onClose = (...args) => {
    _ref && _ref.current && _ref.current.classList.remove('opened');
    onClose && onClose(...args);
  }, baseClassName = 'menu column';
  nav || (nav = []);
  className = (className && `${baseClassName} ${className}`) || baseClassName;
  hooks || (hooks = {});
  typeof translate === 'function' || (translate = Function.identity);

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
    {(nav.length || children) && <div
      className={className}
      ref={_ref}
      {...other}
    >
      <Button
        className='width-100-percent row right do-not-hide background-none close-menu-button'
        src={closeSrc}
        onPress={() => hooks.close()}
        title={translate('Close menu')}
        disabled={!isOpened}
        isLink
      />
      {...(nav.map(({src, icon, iconSrc, ...other} = {}, i) => <Button translate={translate} disabled={!isOpened} {...other} key={`${i}`} />))}
      {children}
    </div> || null}
  </Overlay>;
}

// Helper function to create an on press action with page transition.
export const getOverlayMenuOnPress = (
  route, hook, router, transition = 'slideIn'
) => (
  (...args) => {
    const close = typeof hook === 'function' && hook || (
      hook && typeof hook === 'object' && typeof hook.close === 'function' && hook.close
    ) || null,
    onClosed = typeof route === 'function' && route || (router && route && (() => router.push(route))) || Function.void;
    onClosed && close && (
      transitions.setCurrentTransition(transition),
      close().then(onClosed)
    );
  }
);

// Exports.
export const TRANSITION_TIME =  TT;
Object.defineProperty(OverlayMenu, 'TRANSITION_TIME', {value: TRANSITION_TIME});
Object.defineProperty(OverlayMenu, 'getOnPress', {value: getOverlayMenuOnPress});
export default OverlayMenu;