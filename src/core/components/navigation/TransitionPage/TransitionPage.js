'use client';

import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import AnimationPage from './AnimationPage';
import Platform from '../../../native/Platform';

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