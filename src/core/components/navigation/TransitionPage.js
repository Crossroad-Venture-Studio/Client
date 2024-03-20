'use client';

import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import AnimationPage from './AnimationPage';
import { useState, useEffect } from 'react';
// import Platform from '../../native/Platform';

import dynamic from 'next/dynamic';
const Platform = dynamic(() => import('../../native/Platform'), {
  ssr: false,
});

// Main component.
export const TransitionPage = props => {
  let {
    mode,
    initial = false,
    children,
    touchScreenOnly,
    ...other
  } = props || {};
  Array.isArray(children || (children = [])) || (children = [children]);

  // Hooks.
  const key = usePathname();
  // const [hasTouchScreen, setHasTouchScreen] = useState(!touchScreenOnly);
  // touchScreenOnly && useEffect(() => {
  //   Platform.hasTouchScreen && setHasTouchScreen(true);
  // }, []);

  // Render.
  return (!touchScreenOnly || Platform.hasTouchScreen) && (
    <AnimatePresence
      mode={mode || 'popLayout'}
      initial={initial || false}
      className='relative'
    >
      <AnimationPage {...other} key={key}>{...children}</AnimationPage>
    </AnimatePresence>
  ) || <>{...children}</>;
}

// Default export.
export default TransitionPage;