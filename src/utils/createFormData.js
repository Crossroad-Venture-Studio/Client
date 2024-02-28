const createFormData = (input, defaultOutput = {}) => {
  if (!input || typeof input !== 'object') return defaultOutput;

  console.log(input, input instanceof SubmitEvent);
  input.preventDefault();

  const output = {};
  input instanceof SubmitEvent && (
    input.preventDefault(),
    input = input.target
  );

  input = new FormData(input);
  for (const pair of input) {
    const [key, value] = pair;
    (typeof value === 'number' || typeof value === 'boolean' || value) && (
      output[key] = value
    );
  }

  return output;
}

// Exports.
export default Object.freeze(Object.defineProperty(createFormData, 'createFormData', {
  value: createFormData
}));