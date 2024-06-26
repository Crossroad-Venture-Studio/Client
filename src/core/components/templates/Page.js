'use client';

// Imports.
import { useEffect, useRef, forwardRef } from 'react';
import throttle from '../../../../utils/src/throttle';

// Main component.
export const Page = forwardRef((props, ref) => {
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
  // const ref = useRef();
  ref || (ref = useRef());
  useEffect(() => {
    observeScroll && setTimeout(() => {
      ref && ref.current && ref.current.addEventListener('scroll', throttle(() => {
        ref && ref.current && (ref.current.dataset.scrolling = ref.current.scrollTop > 0);
      }), { passive: true });
    }, 100);
  }, []);
  
  return <main className={className} ref={ref} {...other}>
    {...children}
  </main>
});

// Exports.
export default Page;