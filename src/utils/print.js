// Imports.
import Platform from '../core/native/Platform';

// Helper function to trigger the pinter.
export const print = () => (
  Platform.window && typeof Platform.window.print === 'function' && Platform.window.print()
);

// Defaut export.
export default print;