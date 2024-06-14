// Imports.
import { createContext, useContext } from 'react';
import useObserver from '../core/hooks/useObserver';

// Main utility.
export const createObserver = (
  obj,
  key,
) => {
  // Create the context.
  const Context = createContext(),
  // Create the setter.
  setFunctionName = `set${key.charAt(0).toUpperCase()}${key.substring(1)}`,
  // Create the observer.
  Observer = props => {
    const children = props || {},
      [state, setState] = useObserver(obj, key);
    return <Context.Provider value={{ [key]: state, [setFunctionName]: setState }}>
      {children}
    </Context.Provider>;
  };
  // Create the context accessor.
  Observer.useContext = () => {
    const context = useContext(Context);
    if (!context) {
      throw new Error('useContext must be used within an Observer parent component');
    }
    return context;
  };

  // Return the observer.
  return Observer;
}

// Default export.
export default createObserver;