// Imports.
import { useReducer } from 'react';

// Main function.
export function useForceUpdate() {
  const [_, forceUpdate] = useReducer(x => x + 1, 0); // integer state
  return forceUpdate; // update state to force render
  // A function that increment 👆🏻 the previous state like here 
  // is better than directly setting `setValue(value + 1)`
}

// Default export.
export default useForceUpdate;