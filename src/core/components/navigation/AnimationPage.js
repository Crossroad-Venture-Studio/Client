'use client';

import { motion } from 'framer-motion';
import animations from './animations';
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
  animation = Object.assign({}, animations.current || animations.default, animation || {});
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
      style={{position: 'absolute'}}
      {...animation}
      {...other}
      onAnimationStart={() => {
        console.log('starting');
        setFreeze(true);
      }}
      onAnimationComplete={definition => {
        definition === 'exit' && setFreeze(false);
        console.log('Completed animating', definition);
      }}
    >
      <FrozenRoute freeze={freeze}>
        {...children}
      </FrozenRoute>
    </motion.div>
  );
});

export default AnimationPage;