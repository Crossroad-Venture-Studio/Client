const createFormData = (input, defaultOutput = {}) => {
  //if (!input || typeof input !== 'object') return defaultOutput;
  input.preventDefault();

  const output = {};
  try {
    console.log('>>>>', input instanceof SyntheticBaseEvent || input instanceof SubmitEvent);
    (input instanceof SyntheticBaseEvent || input instanceof SubmitEvent)  && (
      input.preventDefault(),
      input = input.target
    );
  } catch {
    input instanceof SubmitEvent && (
      input.preventDefault(),
      input = input.target
    );
  };

  console.log('INPUT', input);

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