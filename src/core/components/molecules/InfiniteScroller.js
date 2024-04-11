// Imports.
import { useEffect, useRef, useState } from 'react';

export const InfiniteScrollerItem = props => {
  // Normalize input.
  let {
    url,
    href = url,
    logoSrc,
    logo = logoSrc,
    pic = logo,
    image = pic,
    img = image,
    imgSrc = img,
    src = imgSrc,
    className,
    target = '_blank',
    children
  } = props || {};
  const baseClassName = 'infinite-scroller-item';
  className = className && `${baseClassName} ${className}` || baseClassName;

  // Render.
  return (src || children) && (
    href && <Link className={className} href={href} target={target || null}>
      {src && <img src={src} className='infinite-scroller-item-img'>
        </img> || null}
      {children}
    </Link> || <div className={className}>
      {src && <img src={src} className='infinite-scroller-item-img'>
        </img> || null}
      {children}
    </div>
   ) || null;
}

// Main component.
export const InfiniteScroller = props => {
  // Normalize input.
  let {
    className,
    children,
    left,
    right,
    direction = left && 'left' || (right && 'right'),
    dir = direction,
    fast,
    slow,
    speed = fast && 'fast' || (slow && 'slow'),
    data
  } = props || {},
  baseClassName = 'infinite-scroller';
  className = className && `${baseClassName} ${className}` || baseClassName;
  const [extraChildren, setExtraChildren] = useState(null), ref = useRef(null);

  // Set the animation.
  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const p = [], arr = React.Children.toArray(children) || [];
      dir && p.push(['data-direction', dir]);
      speed && p.push(['data-speed', speed]);
      data = (data || (data = [])).filter(x => Array.isArray(x) && x.length > 1);
      const c = addAnimation(ref, arr.concat(data.map(x => <InfiniteScrollerItem {...(x || {})} />)), p);
      c && setExtraChildren(c);
    }
  }, []);

  // Render.
  <div className='infinite-scroller' ref={ref}>
    <div className='infinite-scroller-inner'>
      {children}
      {extraChildren}
    </div>
  </div>
}

// Helper function to add the animation.
const addAnimation = (ref, children, props) => {
  ref && ref.current && (ref = ref.current);
  if (!(ref && children)) return null;

  // add data-animated="true" to every `.infinite-scroller` on the page
  ref.setAttribute('data-animated', true);
  Array.isArray(props || (props = [])) ||
  (typeof props === 'string' && (props = [[props, true]]))
  || (typeof props === 'object' && (props = Object.entries(props)));
  props = props.map(prop => Array.isArray(prop) && (
    prop.length > 1 && prop
    || (prop.length === 1 && [prop[0], true])
  ) || prop && ((
    typeof prop === 'string' && [prop, true]
  ) || (
    typeof prop === 'object' && Object.entries(props)[0]
  )) || null).filter(x => Array.isArray(x) && x.length > 1);
  for (let i = 0, l = props.length, p; i !== l; ++i) {
    ref.setAttribute((p = props[i])[0], p[1]);
  }

  // Clone children, for the animation.
  return children.map((child, i) => (
    React.cloneElement(child, { 'aria-hidden': true, key: `${i}` })
  ));
}

// Default export.
export default InfiniteScroller;
