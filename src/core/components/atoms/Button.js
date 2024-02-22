'use client';

import createEventHandlers from '../../../utils/createEventHandlers';
import createStopPropagationFunc from '../../../utils/createStopPropagationFunc';

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
    title = `Go to ${text || src}`,
    alt = title,
    className,
    children,
    doNotHide,
    ...other
  } = props || {};
  Object.assign(other, createEventHandlers({onPress: createStopPropagationFunc(onPress)}));
  href || (href = null);
  className = className && `button ${className}` || 'button';

  // Layout.
  return <a
    href={href}
    className={className}
    title={title}
    {...other}
  >
    {src && <img className={`icon${doNotHide && ' do-not-hide' || ''}`} src={src || null} alt={alt || null}></img>}
    {text && <span className={`vertical-trim${doNotHide && ' do-not-hide' || ''}`}>{text}</span> || null}
    {...(children || [])}
  </a>
}

// Exports.
export default Object.freeze(Object.defineProperty(Button, 'Button', {
  value: Button
}));