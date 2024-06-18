'use client';

import { forwardRef } from 'react';
import createEventHandlers from '../../../utils/createEventHandlers';

// Main component.
export const Form = forwardRef((props, ref) => {
  // Normalize input.
  let {
    onLogin,
    onSubmit = onLogin,
    className,
    children,
    ...other
  } = props || {};
  className = className && `form ${className}` || 'form';
  Object.assign(other, createEventHandlers({onSubmit}));
  Array.isArray(children || (children = [])) || (children = [children]);

  // Layout.
  return <form className={className} ref={ref} {...other}>
    {...children}
  </form>;
});

// Exports.
export default Form;