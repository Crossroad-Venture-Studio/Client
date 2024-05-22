// Create new 16 alpha numeric ID based on the current date, time and random numbers.
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
export const createId = () => {
  let result = Date.now().toString(36), i;
  result.length > 15 && (result = result.slice(result.length - 13));
  for (i = result.length; i !== 16; ++i) {
    result += CHARS.charAt(~~(Math.random() * 62));
  }

  console.log('creating new id', result);

  return result;
}

// Default export.
export default createId;