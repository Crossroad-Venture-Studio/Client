'use client';

import {forwardRef} from 'react';
import Link from 'next/link';
import createEventHandlers from '../../../utils/createEventHandlers';
import transitions from '../navigation/TransitionPage/transitions';
import '../../../../utils/src/functionUtils';

// Main component.
export const Button = forwardRef((props, ref) => {
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
    translate,
    __translate__ = typeof translate === 'function' && translate || Function.identity,
    title = (text || src) && `${__translate__('Go to')} ${__translate__(text || src)}` || null,
    alt = title,
    disabled,
    className,
    content,
    Content = content,
    children,
    doNotHide,
    transition,
    type = 'button',
    fat,
    isLink,
    hasNotification,
    notification = hasNotification,
    submit = `${(type || '')}`.toLowerCase() === 'submit',
    scroll = false,
    textStyle = 'vertical-trim',
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
  textStyle = `button-text${textStyle && ` ${textStyle}` || ''}${doNotHide && ' do-not-hide' || ''}${fat && ' fat' || ''}`;
  translate = __translate__;
  title && (title = translate(title));
  alt && (alt = translate(alt));

  // Layout.
  return href && <Link
  ref={ref}
  href={href}
  scroll={scroll}
  className={className}
  title={title}
  {...other}
>
  {src && <img className={`button-img icon${doNotHide && ' do-not-hide' || ''}`} src={src || null} alt={alt || null} />}
  {text && <span className={textStyle}>{translate(text)}</span> || null}
  {content}
  {children}
</Link> ||  <button
    ref={ref}
    className={className}
    title={title}
    type={type || (submit && 'submit') || null}
    {...other}
  >
    {src && <img className={`button-img icon${doNotHide && ' do-not-hide' || ''}`} src={src || null} alt={alt || null} />}
    {text && <span className={textStyle}>{translate(text)}</span> || null}
    {typeof Content === 'function' && <Content /> || Content}
    {children}
  </button>;
});

// Exports.
export default Button;