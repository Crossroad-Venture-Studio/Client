'use client';

import createEventHandlers from '../../../utils/createEventHandlers';

// Main component.
const Button = props => {
  // Normalize input.
  let {
    link,
    url = link,
    href = url,
    onClick,
    onPress = onClick,
    value,
    text = value,
    iconSrc,
    icon = iconSrc,
    src = icon,
    title = (text || src) && `Go to ${text || src}` || null,
    alt = title,
    className,
    children,
    doNotHide,
    type,
    submit = `${(type || '')}`.toLowerCase() === 'submit',
    ...other
  } = props || {};
  onPress || (submit && href && (onPress = () => window.location.href = href));
  Object.assign(other, createEventHandlers({onPress}));
  href || (href = null);
  className = className && `button ${className}` || 'button';
  Array.isArray(children || (children = [])) || (children = [children]);

  // Layout.
  return submit && <button
    className={className}
    title={title}
    type='submit'
    {...other}
  >
    {src && <img className={`icon${doNotHide && ' do-not-hide' || ''}`} src={src || null} alt={alt || null} />}
    {text && <span className={`fat vertical-trim${doNotHide && ' do-not-hide' || ''}`}>{text}</span> || null}
    {...children}
  </button> || <a
    href={href}
    className={className}
    title={title}
    {...other}
  >
    {src && <img className={`icon${doNotHide && ' do-not-hide' || ''}`} src={src || null} alt={alt || null} />}
    {text && <span className={`fat vertical-trim${doNotHide && ' do-not-hide' || ''}`}>{text}</span> || null}
    {...children}
  </a>
}

// Exports.
export default Object.freeze(Object.defineProperty(Button, 'Button', {
  value: Button
}));