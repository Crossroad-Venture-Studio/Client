// Imports.
import Column from './Column';


// Main component.
let KEY = 0;
export const ChatBubble = props => {
  let {
    className,
    value,
    text = value,
    isStart,
    isEnd,
    isUser,
    name,
    date,
    time = date,
    info = [name, time].filter(x => x).join('•'),
    from,
    sender = from,
    children,
    ...other
  } = props || {}
  baseClassName = 'chat-bubble';
  isStart && (baseClassName += ' start');
  isEnd && (baseClassName += ' end');
  isUser && (baseClassName += ' user');
  className = className && `${baseClassName} ${className}` || baseClassName;

  // Render.
  return <Column key={`chat-bubble-${KEY++}`} className={`chat-bubble-container ${isUser && 'right user' || 'left'}`}>
    <Column className={className} {...other}>
      {text && <span className='chat-bubble-text'>
        {text}
      </span> || null}
      {children}
    </Column>
    {info && <Column className='chat-bubble-info'>
      {info}
    </Column> || null }
  </Column>;
}

// Default export.
export default ChatBubble;