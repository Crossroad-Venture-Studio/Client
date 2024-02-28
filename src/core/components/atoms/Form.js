'use client';

import createEventHandlers from '../../../utils/createEventHandlers';

// Main component.
const Form = props => {
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

  // Layout.
  return <form className={className} {...other}>
    {...(children || [])}
  </form>;
}

// Exports.
export default Object.freeze(Object.defineProperty(Form, 'Form', {
  value: Form
}));