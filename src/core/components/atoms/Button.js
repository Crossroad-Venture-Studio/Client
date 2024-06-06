'use client';

import Link from 'next/link';
import createEventHandlers from '../../../utils/createEventHandlers';
import transitions from '../navigation/TransitionPage/transitions';
import '../../../../utils/src/functionUtils';

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
    disabled,
    className,
    children,
    doNotHide,
    transition,
    type,
    fat,
    isLink,
    hasNotification,
    notification = hasNotification,
    submit = `${(type || '')}`.toLowerCase() === 'submit',
    scroll = false,
    textStyle = 'vertical-trim',
    translate,
    ...other
  } = props || {}, t;
  notification = typeof notification === 'string' && (
    (notification = notification.toLowerCase()).startsWith('err') && 'error-notification'
    || (notification.startsWith('warn') && 'warning-notification')
    || (notification.startsWith('succ') && 'success-notification')
    || (notification.startsWith('info') && 'info-notification')
    || (notification.startsWith('light') && 'light-notification')
    || (notification.startsWith('dark') && 'dark-notification')
  ) || (notification && 'notification') || '';
  notification && (notification = ` ${notification}`);
  const baseClassName = `${isLink && 'link' || 'button'}${notification}${disabled && ' disabled' || ''}`;
  onPress || (submit && href && (onPress = () => window.location.href = href));
  const events = {onPress, ...other};
  typeof transition === 'string' && (t = transition, transition = transitions[t] || (() => transitions.setCurrentTransition(t)));
  typeof transition === 'function' && (
    events.onPress = typeof onPress === 'function' && ((...args) => {transition(...args); return onPress(...args);})
    || transition
  );
  Object.assign(other, createEventHandlers(events));
  href || (href = null);
  className = className && `${baseClassName} ${className}` || baseClassName;
  doNotHide && (className += ' do-not-hide');
  Array.isArray(children || (children = [])) || (children = [children]);
  textStyle = `button-text${textStyle && ` ${textStyle}` || ''}${doNotHide && ' do-not-hide' || ''}${fat && ' fat' || ''}`;
  typeof translate === 'function' || (translate = Function.identity);

  // Layout.
  return href && <Link
  href={href}
  scroll={scroll}
  className={className}
  title={title}
  {...other}
>
  {src && <img className={`button-img icon${doNotHide && ' do-not-hide' || ''}`} src={src || null} alt={alt || null} />}
  {text && <span className={textStyle}>{translate(text)}</span> || null}
  {...children}
</Link> ||  <button
    className={className}
    title={title}
    type={type || (submit && 'submit') || null}
    {...other}
  >
    {src && <img className={`button-img icon${doNotHide && ' do-not-hide' || ''}`} src={src || null} alt={alt || null} />}
    {text && <span className={textStyle}>{translate(text)}</span> || null}
    {...children}
  </button>;
}

// Exports.
export default Button;