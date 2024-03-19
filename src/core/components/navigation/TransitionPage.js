'use client';

import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import AnimationPage from './AnimationPage';

// Main component.
export const TransitionPage = props => {
  let {
    mode,
    initial = false,
    children,
    ...other
  } = props || {};
  Array.isArray(children || (children = [])) || (children = [children]);

  // Hooks.
  const key = usePathname();

  // Render.
  return (
    <AnimatePresence
      mode={mode || 'popLayout'}
      initial={initial || false}
      className='relative'
    >
      <AnimationPage {...other} key={key}>{...children}</AnimationPage>
    </AnimatePresence>
  );
}

// Default export.
export default TransitionPage;