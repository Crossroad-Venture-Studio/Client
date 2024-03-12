'use client';

import createEventHandlers from '../../../utils/createEventHandlers';

// Main component.
export const Form = props => {
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
  return <form className={className} {...other}>
    {...children}
  </form>;
}

// Exports.
export default Form;