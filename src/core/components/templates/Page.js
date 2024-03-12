'use client';

// Main component.
export const Page = props => {
  // Normalize input.
  let {
    children,
    className,
    safearea,
    ...other
  } = props || {};
  className = (className && `page ${className}`) || 'page';
  safearea && (className = `safearea ${className}`);
  Array.isArray(children || (children = [])) || (children = [children]);
  
  return <main className={className} {...other}>
    {...children}
  </main>
}

// Exports.
export default Page;