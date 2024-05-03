// Imports.
import { cloneElement } from 'react';
import ChatBubble from '../atoms/ChatBubble';

// Main component.
export const ChatFeed = props => {
  let {
    className,
    data,
    children,
    ...other
  } = props || {}
  baseClassName = 'chat-feed';
  className = className && `${baseClassName} ${className}` || baseClassName;
  data = data && (
    Array.isArray(data) && data.filter(x => x && typeof x === 'object')
    || (typeof data === 'object' && [data])
  ) || [];

  // Render.
  return data.length && <Column className={className}>
    {data.map(({element, component = element, Component = component, ...b}) => (
      Component && cloneElement(component, b) || <ChatBubble {...b} />
    ))}
  </Column> || null;
}

// Default export.
export default ChatFeed;