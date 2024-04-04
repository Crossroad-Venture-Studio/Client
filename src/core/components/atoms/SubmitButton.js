import Button from './Button';

// Main component.
export const SubmitButton = props => {
  // Normalize input.
  let {
    type,
    className,
    children,
    value = !children && 'Submit' || null,
    text = value,
    ...other
  } = props || {};
  className = className && `submit-button ${className}` || 'submit-button';
  other.children = children;

  // Layout.
  return <Button
    type='submit'
    text={text}
    className={className}
    {...other}
  ></Button>;
}

// Exports.
export default SubmitButton;