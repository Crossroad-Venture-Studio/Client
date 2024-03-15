import Button from './Button';

// Main component.
export const SubmitButton = props => {
  // Normalize input.
  const {
    type,
    ...other
  } = props || {};

  // Layout.
  return <Button
    type='submit'
    {...other}
  ></Button>;
}

// Exports.
export default SubmitButton;