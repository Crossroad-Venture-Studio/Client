'use client';

// Imports.
import Platform from '../../native/Platform';
import { useEffect, useRef } from 'react';
import debounce from '../../../../utils/src/debounce';

// Main component.
export const Page = props => {
  // Normalize input.
  let {
    children,
    className,
    safearea,
    observeScroll,
    ...other
  } = props || {};
  className = (className && `page ${className}`) || 'page';
  safearea && (className = `safearea ${className}`);
  Array.isArray(children || (children = [])) || (children = [children]);

  // Detect scroll.
  const ref = useRef();
  observeScroll && useEffect(() => {
    Platform.document.addEventListener('scroll', debounce(() => {
      ref && ref.current && (ref.current.dataset.scrolling = window.scrollTop > 0);
    }), { passive: true });
  }, []);
  
  return <main className={className} ref={ref} {...other}>
    {...children}
  </main>
}

// Exports.
export default Page;