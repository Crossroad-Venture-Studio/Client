'use client';

import Link from 'next/link';
import createEventHandlers from '../../../utils/createEventHandlers';
import transitions from '../navigation/TransitionPage/transitions';

// Main component.
export const Button = props => {
  // Normalize input.
  let {
    link,
    url = link,
    href = url,
    onPress,
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
    transition,
    type,
    hasNotification,
    notification = hasNotification,
    submit = `${(type || '')}`.toLowerCase() === 'submit',
    scroll = false,
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
  notification && (notification = ` ${notification}`);
  const baseClassName = `button${notification}`;
  onPress || (submit && href && (onPress = () => window.location.href = href));
  const events = {onPress, ...other};
  typeof transition === 'string' && (transition = () => transitions.setCurrentTransition(transition));
  typeof transition === 'function' && (
    events.onPress = typeof onPress === 'function' && ((...args) => {transition(...args); console.log('>', transitions.__current__.__name__);return onPress(...args);})
    || transition
  );
  console.log('# transition', transition);
  Object.assign(other, createEventHandlers(events));
  href || (href = null);
  className = className && `${baseClassName} ${className}` || baseClassName;
  Array.isArray(children || (children = [])) || (children = [children]);

  // Layout.
  return href && <Link
  href={href}
  scroll={scroll}
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