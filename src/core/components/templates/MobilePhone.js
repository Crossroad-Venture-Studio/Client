// Main component.
export const MobilePhone = props => {
  // Normalize input.
  let {
    className,
    ...other
  } = props || {};
  const baseClassName = 'mobile-phone';
  className = className && `${baseClassName} ${className}` || baseClassName;

  // Render.
  return <div className={className} {...other} />;
}

// Default export.
export default MobilePhone;