// Imports.
import { useEffect, useRef } from 'react';
import Column from './Column';
import Button from './Button';
import '../../../../utils/src/functionUtils';

// Main component.
export const ChatBubble = props => {
  // Normalise input.
  let {
    className,
    value,
    text = value,
    imgSrc,
    img = imgSrc,
    src = img,
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
    button,
    buttons = button,
    content,
    Content = content,
    hide,
    onRender,
    translate,
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
  typeof translate === 'function' || (translate = Function.identity);

  buttons && !Array.isArray(buttons) && (buttons = [buttons]);
  buttons = (buttons || []).filter(Function.exists);

  for (const k in style) {
    (k.includes('text') || k.includes('font')) && (
      textStyle[k] = style[k],
      delete style[k]
    );
  }

  useEffect(() => {
    if (animTime) {
      let j = 0, t = '', f = () => {
        t += text[j++];
        textRef.current.innerHTML = t;
        j < text.length && setTimeout(f, animTime);
      };
      f();
    }
  });

  useEffect(() => {
    typeof onRender === 'function' && onRender();
  }, []);

  // Render.
  return <Column className={`chat-bubble-container${isUser && ' right user' || ' left'}${hide && ' hidden' || ''}`}>
    <Column className={className} {...other} style={style}>
      {text && <span ref={textRef} className='chat-bubble-text' style={textStyle}>
        {!animTime && text || ''}
      </span> || null}
      {typeof Content === 'function' && <Content /> || Content}
      {children}
      {src && <div className='chat-bubble-image-container'><img className='chat-bubble-image' src={src} /></div>}
      {buttons.length && buttons.map((b, i) => <Button translate={translate} className='chat-bubble-button' key={`${i}`} {...(b || {})}/>) || null}
    </Column>
    {info && <Column className={`chat-bubble-info${isUser && ' user' || ''}`}>
      {info}
    </Column> || null }
  </Column>;
}

// Default export.
export default ChatBubble;