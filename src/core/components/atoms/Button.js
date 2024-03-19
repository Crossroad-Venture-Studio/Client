'use client';

import Link from 'next/link';
import createEventHandlers from '../../../utils/createEventHandlers';

// Main component.
export const Button = props => {
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
    hasNotification,
    notification = hasNotification,
    submit = `${(type || '')}`.toLowerCase() === 'submit',
    ...other
  } = props || {};
  notification = typeof notification === 'string' && (
    (notification = notification.toLowerCase()).startsWith('err') && 'error-notification'
    || (notification.startsWith('warn') && 'warning-notification')
    || (notification.startsWith('succ') && 'success-notification')
    || (notification.startsWith('info') && 'info-notification')
    || (notification.startsWith('light') && 'light-notification')
    || (notification.startsWith('dark') && 'dark-notification')
  ) || (notification && 'notification') || '';
  notification && (notification = ` ${notification}`)
  const baseClassName = `button${notification}`;
  onPress || (submit && href && (onPress = () => window.location.href = href));
  Object.assign(other, createEventHandlers({onPress}));
  href || (href = null);
  className = className && `${baseClassName} ${className}` || baseClassName;
  Array.isArray(children || (children = [])) || (children = [children]);

  // Layout.
  return href && <Link
  href={href}
  scroll={false}
  className={className}
  title={title}
  {...other}
>
  {src && <img className={`icon${doNotHide && ' do-not-hide' || ''}`} src={src || null} alt={alt || null} />}
  {text && <span className={`fat vertical-trim${doNotHide && ' do-not-hide' || ''}`}>{text}</span> || null}
  {...children}
</Link> ||  <button
    className={className}
    title={title}
    type={type || (submit && 'submit') || null}
    {...other}
  >
    {src && <img className={`icon${doNotHide && ' do-not-hide' || ''}`} src={src || null} alt={alt || null} />}
    {text && <span className={`fat vertical-trim${doNotHide && ' do-not-hide' || ''}`}>{text}</span> || null}
    {...children}
  </button>;
}

// Exports.
export default Button;