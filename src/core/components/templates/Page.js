'use client';

// Imports.
import { useEffect, useRef } from 'react';
import throttle from '../../../../utils/src/throttle';

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
    console.log('observeScroll');
    ref && ref.current && ref.current.addEventListener('scroll', throttle(() => {
      console.log('scrolling', ref.current.scrollTop);
      ref && ref.current && (ref.current.dataset.scrolling = ref.current.scrollTop > 0);
    }), { passive: true });
  }, []);
  
  return <main className={className} ref={ref} {...other}>
    {...children}
  </main>
}

// Exports.
export default Page;