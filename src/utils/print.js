// Imports.
import Platform from '../core/native/Platform';

// Helper function to trigger the pinter.
export const print = () => {
  const w = Platform.window, p = w && w.print;
  if (typeof p === 'function') {
    const pages = Platform.document.getElementsByClassName('page') || [];
    for (let i = 0, l = pages.length; i !== l; ++i) {
      pages[i].classList.add('print');
    }
    w.print();
    for (let i = 0, l = pages.length; i !== l; ++i) {
      pages[i].classList.remove('print');
    }
  }
};

// Defaut export.
export default print;