import Button from './Button';

// Main component.
const BackButton = props => {
  // Normalize input.
  let {
    iconSrc = 'https://crossroad-venture-studio.github.io/Design-System/icons/navigation/chevron-left-wired-light.svg',
    icon = iconSrc,
    src = icon,
    alt = 'Back to previous page',
    title = 'Back to previous page',
    value = 'Back',
    text = value,
    ...other
  } = props || {};

  // Layout.
  return <Button
    title={title}
    src={src}
    text={text}
    doNotHide
    {...other}
  >
  </Button>;
}

// Exports.
export default Object.freeze(Object.defineProperty(BackButton, 'BackButton', {
  value: BackButton
}));