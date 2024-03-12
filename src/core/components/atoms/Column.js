'use client';

// Main component.
export const Column = props => {
  // Normalize input.
  let {
    className,
    children,
    ...other
  } = props || {};
  className = className && `column ${className}` || 'column';
  Array.isArray(children || (children = [])) || (children = [children]);

  // Layout.
  return <div className={className} {...other}>
    {...children}
  </div>
}

// Exports.
export default Column;