'use client';

// Main component.
export const Row = props => {
  // Normalize input.
  let {
    className,
    children,
    ...other
  } = props || {};
  className = className && `row ${className}` || 'row';
  Array.isArray(children || (children = [])) || (children = [children]);

  // Layout.
  return <div className={className} {...other}>
    {...children}
  </div>
}

// Exports.
export default Row;