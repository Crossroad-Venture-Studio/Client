'use client';

// Main component.
const Row = props => {
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
export default Object.freeze(Object.defineProperty(Row, 'Row', {
  value: Row
}));