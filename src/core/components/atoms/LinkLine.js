'use client';

import Button from './Button';
import createEventHandlers from '../../../utils/createEventHandlers';

// Main component.
export const LinkLine = props => {
  // Normalize input.
  let {
    // Action.
    link,
    url = link,
    href = url,
    onClick,
    onPress = onClick,
    // Left part.
    leftIconSrc,
    leftIcon = leftIconSrc,
    leftSrc = leftIcon,
    leftTitle,
    leftAlt,
    leftValue,
    leftText = leftValue,
    // Right part.
    rightIconSrc,
    rightIcon = rightIconSrc,
    rightSrc = rightIcon,
    rightTitle,
    rightAlt,
    rightValue,
    rightText = rightValue,
    // Other.
    className,
    children,
    scroll = false,
    ...other
  } = props || {};
  const events = createEventHandlers({onPress});
  className = className && `link-line ${className}` || 'link-line';
  Array.isArray(children || (children = [])) || (children = [children]);
  href || (href = null);

  // Layout.
  return <Button
    className={className}
    href={href}
    scroll={scroll}
    {...events}
    {...other}
  >
    {(leftSrc || leftText) && <div title={leftTitle || leftAlt || null}>
      {leftSrc && <img src={leftSrc} className='icon' alt={leftAlt || leftTitle || null} /> || null}
      {leftText && <span className='fat vertical-trim'>{leftText}</span> || null}
    </div> || null}
    {...children}
    <div
      title={rightTitle || rightAlt || null}
    >
      {rightText && <span className='fat vertical-trim'>{rightText}</span> || null}
      {rightSrc && <img src={rightSrc} className='icon' alt={rightAlt || rightTitle || null} title={rightTitle || rightAlt || null} /> || null}
    </div>
  </Button>
}

// Exports.
export default LinkLine;