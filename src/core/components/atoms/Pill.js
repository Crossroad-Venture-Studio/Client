import Button from './Button';

// Main component.
const Pill = props => {
  // Normalize input.
  let {
    className,
    children,
    ...other
  } = props || {};
  className = className && `pill ${className}` || 'pill';

  // Layout.
  return <Button className={className} {...other}>{...(children || [])}</Button>;
}

// Exports.
export default Object.freeze(Object.defineProperty(Pill, 'Pill', {
  value: Pill
}));