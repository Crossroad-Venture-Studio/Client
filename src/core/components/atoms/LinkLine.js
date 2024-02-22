'use client';

import createEventHandlers from '../../../utils/createEventHandlers';
import createStopPropagationFunc from '../../../utils/createStopPropagationFunc';

// Main component.
const LinkLine = props => {
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
    rightIcon = leftIconSrc,
    rightSrc = leftIcon,
    rightTitle,
    rightAlt,
    rightValue,
    rightText = leftValue,
    // Other.
    className,
    children,
    ...other
  } = props || {};
  const events = createEventHandlers({onPress: createStopPropagationFunc(onPress)});
  href || (href = null);
  className = className && `link-line ${className}` || 'link-line';

  // Layout.
  return <div className={className} {...other}>
    {(leftSrc || leftText) && <div title={leftTitle || leftAlt || null}>
      {leftSrc && <img className='icon' alt={leftAlt || leftTitle || null} /> || null}
      {leftText && <span className='trim-vertical'>{leftText}</span> || null}
    </div> || null}
    {...(children || [])}
    {(rightSrc || rightText) && <a
      title={rightTitle || rightAlt || null}
      href={href || null}
      {...events}
    >
      {rightText && <span className='trim-vertical'>{rightText}</span> || null}
      {rightSrc && <img className='icon' alt={rightAlt || rightTitle || null} /> || null}
    </a> || null}
  </div>

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
export default Object.freeze(Object.defineProperty(LinkLine, 'LinkLine', {
  value: LinkLine
}));