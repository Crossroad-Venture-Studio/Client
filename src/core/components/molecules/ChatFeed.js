// Imports.
import { cloneElement, useRef, useEffect } from 'react';
import ChatBubble from '../atoms/ChatBubble';

// Main component.
export const ChatFeed = props => {
  let {
    className,
    history,
    data = history,
    children,
    ...other
  } = props || {},
  baseClassName = 'chat-feed column';
  className = className && `${baseClassName} ${className}` || baseClassName;
  data = data && (
    Array.isArray(data) && data.filter(x => x && typeof x === 'object')
    || (typeof data === 'object' && [data])
  ) || [];

  other.ref || (other.ref = useRef(null));

  // useeffect to scroll to bottom of the page when history updates
  useEffect(() => {
    // Scrolling to the last element.
    const el = other.ref.current;
    el && (el.scrollTop = el.scrollHeight);
  }, []);

  // Render.
  return data.length && <div className={className} {...other}>
    {data.map(({element, component = element, Component = component, ...b}, i) => (
      Component && cloneElement(component, b) || <ChatBubble key={`${i}`} {...b} />
    ))}
  </div> || null;
}

// Default export.
export default ChatFeed;