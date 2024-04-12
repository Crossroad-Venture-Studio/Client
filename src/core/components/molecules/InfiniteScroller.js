'use client';

// Imports.
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Sub-component to render the data.
export const InfiniteScrollerItem = props => {
  // Normalize input.
  let {
    name,
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
    alt = name && `${name} logo` || 'Logo',
    title = alt,
    children
  } = props || {};
  const baseClassName = 'infinite-scroller-item';
  className = className && `${baseClassName} ${className}` || baseClassName;

  // Render.
  return (src || children) && (
    href && <Link className={className} href={href} title={title} target={target || null}>
      {src && <link rel='preload' as='image' href={src} /> || null}
      {src && <img
        src={src}
        alt={alt}
        className='infinite-scroller-item-img'
      /> || null}
      {children}
    </Link> || <div className={className} title={title}>
      {src && <link rel='preload' as='image' href={src} /> || null}
      {src && <img
        src={src}
        alt={alt}
        className='infinite-scroller-item-img'
      />  || null}
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
  data = (data || (data = [])).filter(x => x).map((x, i) => <InfiniteScrollerItem {...(x || {})} key={`orig-${i}`} />);
  const [extraChildren, setExtraChildren] = useState(null), ref = useRef(null);

  // Set the animation.
  useEffect(() => {
    if (!(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
       || extraChildren
    )) {
      const p = [], arr = React.Children.toArray(children) || [];
      dir && p.push(['data-direction', dir]);
      speed && p.push(['data-speed', speed]);
      const c = addAnimation(ref, arr.concat(data), p);
      c && setExtraChildren(c);
    }
  }, []);

  // Render.
  return <div className={className} ref={ref}>
    <div className='infinite-scroller-inner'>
      <div className='padding background-color-red'></div>
      {...data}
      {children}
      {extraChildren}
    </div>
  </div>;
}

// Helper function to add the animation.
const addAnimation = (ref, children, props) => {
  ref && Object.hasOwn(ref, 'current') && (ref = ref.current);
  if (!(ref && children)) return null;

  // Add data-animated="true" to every `.infinite-scroller` on the page.
  ref.setAttribute('data-animated', true);

  // Set the attributes for the main element.
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
    React.cloneElement(child, { /*'aria-hidden': true,*/ key: `a-h-${i}` })
  ));
}

// Default export.
export default InfiniteScroller;
