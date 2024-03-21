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
    value = 'Back',
    text = value,
    className,
    doNotHide = true,
    ...other
  } = props || {};
  className = className && `back-button ${className}` || 'back-button';

  // Layout.
  return <Button
    title={title}
    src={src}
    text={text}
    className={className}
    doNotHide={doNotHide}
    {...other}
  >
  </Button>;
}

// Exports.
export default BackButton;