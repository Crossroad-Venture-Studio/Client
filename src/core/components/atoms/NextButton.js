import Button from './Button';

// Main component.
const NextButton = props => {
  // Normalize input.
  let {
    iconSrc = 'https://crossroad-venture-studio.github.io/Design-System/icons/navigation/chevron-right-wired-light.svg',
    icon = iconSrc,
    src = icon,
    alt = 'Go to next page',
    title = 'Go to next page',
    value = 'Next',
    text = value,
    children,
    ...other
  } = props || {};
  Array.isArray(children || (children = [])) || (children = [children]);

  // Layout.
  return <Button
    title={title}
    {...other}
  >
    {...children}
    {text && <span className='vertical-trim do-not-hide'>{text}</span> || null}
    {src && <img className='icon do-not-hide' src={src} alt={alt || null} />}
  </Button>;
}

// Exports.
export default Object.freeze(Object.defineProperty(NextButton, 'NextButton', {
  value: NextButton
}));