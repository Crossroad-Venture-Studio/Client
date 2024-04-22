// Main component.
export const MobilePhone = props => {
  // Normalize input.
  let {
    className,
    flat,
    ...other
  } = props || {};
  const baseClassName = `mobile-phone${flat && ' flat' || ''}`;
  className = className && `${baseClassName} ${className}` || baseClassName;

  // Render.
  return <div className={className} {...other} />;
}

// Default export.
export default MobilePhone;