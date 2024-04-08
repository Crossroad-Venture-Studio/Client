import Button from './Button';

// Main component.
export const BackButton = props => {
  // Normalize input.
  let {
    iconSrc = 'https://crossroad-venture-studio.github.io/Design-System/icons/navigation/chevron-left-wired-light.svg',
    icon = iconSrc,
    src = icon,
    alt = 'Back to previous page',
    title = 'Back to previous page',
    children,
    value = !children && 'Back' || null,
    text = value,
    transition = 'slideOut',
    className,
    doNotHide = true,
    ...other
  } = props || {};
  className = className && `back-button ${className}` || 'back-button';
  other.children = children;

  console.log('BACK', transition);

  // Layout.
  return <Button
    title={title}
    src={src}
    text={text}
    className={className}
    doNotHide={doNotHide}
    transition={transition}
    {...other}
  >
  </Button>;
}

// Exports.
export default BackButton;