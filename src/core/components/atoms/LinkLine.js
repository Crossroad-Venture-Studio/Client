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
    rightIcon = rightIconSrc,
    rightSrc = rightIcon,
    rightTitle,
    rightAlt,
    rightValue,
    rightText = rightValue,
    // Other.
    className,
    children,
    ...other
  } = props || {};
  const events = createEventHandlers({onPress: createStopPropagationFunc(onPress)});
  href || (href = null);
  className = className && `link-line ${className}` || 'link-line';
  Array.isArray(children || (children = [])) || (children = [children]);

  // Layout.
  return <div className={className} {...other}>
    {(leftSrc || leftText) && <div title={leftTitle || leftAlt || null}>
      {leftSrc && <img src={leftSrc} className='icon' alt={leftAlt || leftTitle || null} /> || null}
      {leftText && <span className='fat vertical-trim'>{leftText}</span> || null}
    </div> || null}
    {...children}
    {(rightSrc || rightText) && <a
      title={rightTitle || rightAlt || null}
      href={href || null}
      {...events}
    >
      {rightText && <span className='fat vertical-trim'>{rightText}</span> || null}
      {rightSrc && <img src={rightSrc} className='icon' alt={rightAlt || rightTitle || null} /> || null}
    </a> || null}
  </div>
}

// Exports.
export default Object.freeze(Object.defineProperty(LinkLine, 'LinkLine', {
  value: LinkLine
}));