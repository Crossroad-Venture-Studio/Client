import Button from './Button';

// Main component.
export const NextButton = props => {
  // Normalize input.
  let {
    iconSrc = 'https://crossroad-venture-studio.github.io/Design-System/icons/navigation/chevron-right-wired-light.svg',
    icon = iconSrc,
    src = icon,
    alt = 'Go to next page',
    title = 'Go to next page',
    value = 'Next',
    text = value,
    doNotHide = true,
    transition = 'slideIn',
    children,
    className,
    ...other
  } = props || {};
  Array.isArray(children || (children = [])) || (children = [children]);
  className = className && `next-button ${className}` || 'next-button';

  // Layout.
  return <Button
    title={title}
    className={className}
    doNotHide={doNotHide}
    transition={transition}
    {...other}
  >
    {...children}
    {text && <span className='vertical-trim do-not-hide'>{text}</span> || null}
    {src && <img className='icon do-not-hide' src={src} alt={alt || null} />}
  </Button>;
}

// Exports.
export default NextButton;