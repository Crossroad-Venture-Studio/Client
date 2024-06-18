'use client';

import { forwardRef } from 'react';

// Main component.
export const Column = forwardRef((props, ref) => {
  // Normalize input.
  let {
    className,
    children,
    ...other
  } = props || {};
  className = className && `column ${className}` || 'column';
  Array.isArray(children || (children = [])) || (children = [children]);

  // Layout.
  return <div ref={ref} className={className} {...other}>
    {...children}
  </div>
});

// Exports.
export default Column;