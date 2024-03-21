import Button from './Button';

// Main component.
export const SubmitButton = props => {
  // Normalize input.
  const {
    type,
    className,
    ...other
  } = props || {};
  className = className && `submit-button ${className}` || 'submit-button';

  // Layout.
  return <Button
    type='submit'
    className={className}
    {...other}
  ></Button>;
}

// Exports.
export default SubmitButton;