'use client';

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
    ...other
  } = props || {};
  const events = createEventHandlers({onPress});
  href || (href = null);
  className = className && `link-line ${className}` || 'link-line';
  Array.isArray(children || (children = [])) || (children = [children]);

  // Layout.
  return <div className={className} {...other}>
    {(rightText) && <>
      {(leftSrc || leftText) && <div title={leftTitle || leftAlt || null}>
        {leftSrc && <img src={leftSrc} className='icon' alt={leftAlt || leftTitle || null} /> || null}
        {leftText && <span className='fat vertical-trim'>{leftText}</span> || null}
      </div> || null}
      {...children}
      <a
        href={href || null}
        {...events}
        title={rightTitle || rightAlt || null}
      >
        <span className='fat vertical-trim'>{rightText}</span>
        {rightSrc && <img src={rightSrc} className='icon' alt={rightAlt || rightTitle || null} /> || null}
      </a>
    </> || <a
      href={href || null}
      {...events}
    >
      {(leftSrc || leftText) && <div title={leftTitle || leftAlt || null}>
        {leftSrc && <img src={leftSrc} className='icon' alt={leftAlt || leftTitle || null} /> || null}
        {leftText && <span className='fat vertical-trim'>{leftText}</span> || null}
      </div> || null}
      {...children}
      {(rightSrc || rightText) && <div
        title={rightTitle || rightAlt || null}
      >
        {rightText && <span className='fat vertical-trim'>{rightText}</span> || null}
        {rightSrc && <img src={rightSrc} className='icon' alt={rightAlt || rightTitle || null} /> || null}
      </div> || null}
    </a>}
  </div>
}

// Exports.
export default LinkLine;