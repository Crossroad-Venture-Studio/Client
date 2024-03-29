import Button from './Button';

// Main component.
export const SubmitButton = props => {
  // Normalize input.
  let {
    type,
    className,
    value = 'Submit',
    text = value,
    ...other
  } = props || {};
  className = className && `submit-button ${className}` || 'submit-button';

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