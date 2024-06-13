// Imports.
import { useEffect, useRef } from 'react';
import Column from './Column';

// Main component.
export const ChatBubble = props => {
  let {
    className,
    value,
    text = value,
    __is_start__,
    isStart = __is_start__,
    __is_end__,
    isEnd = __is_end__,
    __is_user__,
    isUser = __is_user__,
    name,
    __date__,
    date = __date__ && new Date(__date__) || undefined,
    __local_time__,
    localTime = __local_time__,
    __time__ = date && (new Date(date)).toLocaleTimeString(localTime) || '',
    time = __time__,
    info = [name, time].filter(x => x).join(' • '),
    from,
    sender = from,
    children,
    conversation_id,
    conversationId,
    style,
    textStyle,
    animTime,
    ...other
  } = props || {},
  baseClassName = 'chat-bubble',
  textRef = useRef();
  isStart && (baseClassName += ' start');
  isEnd && (baseClassName += ' end');
  isUser && (baseClassName += ' user');
  className = className && `${baseClassName} ${className}` || baseClassName;
  style || (style = {});
  textStyle || (textStyle = {});

  for (const k in style) {
    (k.includes('text') || k.includes('font')) && (
      textStyle[k] = style[k],
      delete style[k]
    );
  }

  animTime && useEffect(() => {
    let j = 0, t = '', f = () => {
      t += text[j++];
      textRef.current.innerHTML = t;
      j < t.length &&  setTimeout(f, animTime);
    };
    f();
  }, []);

  // Render.
  return <Column className={`chat-bubble-container ${isUser && 'right user' || 'left'}`}>
    <Column className={className} {...other} style={style}>
      {text && <span ref={textRef} className='chat-bubble-text' style={textStyle}>
        {!animTime && text || ''}
      </span> || null}
      {children}
    </Column>
    {info && <Column className={`chat-bubble-info${isUser && ' user' || ''}`}>
      {info}
    </Column> || null }
  </Column>;
}

// Default export.
export default ChatBubble;