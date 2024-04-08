'use client';

import { motion } from 'framer-motion';
import transitions from './transitions';
import FrozenRoute from './FrozenRoute';
import { forwardRef, useState } from 'react';

// Main component.
export const AnimationPage = forwardRef((props, ref) => {
  let {
    animation,
    children,
    className,
    ...other
  } = props || {}, baseClassName= 'full absolute';
  Array.isArray(children || (children = [])) || (children = [children]);
  animation = Object.assign({}, transitions.__current__ || transitions.__default__, animation || {});
  className = className && `${baseClassName} ${className}` || baseClassName;

  const [freeze, setFreeze] = useState(false);

  // Render.
  return (
    <motion.div
      className={className}
      initial='initial'
      animate='animate'
      exit='exit'
      ref={ref}
      {...animation}
      {...other}
      onAnimationStart={() => {
        setFreeze(true);
      }}
      onAnimationComplete={definition => {
        definition === 'exit' && setFreeze(false);
      }}
    >
      <FrozenRoute freeze={freeze}>
        {...children}
      </FrozenRoute>
    </motion.div>
  );
});

export default AnimationPage;