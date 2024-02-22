'use client';

// Main component.
const Page = props => {
  // Normalize input.
  let {
    children,
    className,
    safearea,
    ...other
  } = props || {};
  className = (className && `page ${className}`) || 'page';
  safearea && (className = `safearea ${className}`);
  
  return <main className={className} {...other}>
    {...(children || [])}
  </main>
}

// Exports.
export default Object.freeze(Object.defineProperty(Page, 'Page', {
  value: Page
}));