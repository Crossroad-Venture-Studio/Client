'use client';

// Main component.
const Icon = props => {
  // Normalize input.
  let {
    iconSrc,
    icon = iconSrc,
    src = icon,
    title = null,
    alt = title,
    className,
    doNotHide,
    ...other
  } = props || {};
  className = className && `icon-container ${className}` || 'icon-container';

  // Layout.
  return <div className={className}>
    <img className={`icon${doNotHide && ' do-not-hide' || ''}`} src={src || null} alt={alt || null} {...other} />
  </div>
}

// Exports.
export default Object.freeze(Object.defineProperty(Icon, 'Icon', {
  value: Icon
}));