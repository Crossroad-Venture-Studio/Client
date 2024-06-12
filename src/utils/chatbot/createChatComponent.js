import { useEffect, useRef } from 'react';
import Button from '../../core/components/atoms/Button';
import Form from '../../core/components/atoms/Form';
import Row from '../../core/components/atoms/Row';
import ChatFeed from '../../core/components/molecules/ChatFeed';
import { useObserver } from '../../core/hooks/useObserver';
import { createUtils } from './createUtils';
import '../../../utils/src/functionUtils';
import Platform from '../../core/native/Platform';
import preventDefaultEventHandler from '../preventDefaultEventHandler';

// Main utility.
export const createChatComponent = ({
  name,
  botName = name,
  src,
  botSrc = src,
  webSocketUrl,
  userStore,
  store = userStore,
  conversationHistoryKey = 'conversationHistory',
  conversationIdKey = 'conversation_id',
  normalizeHistory: _normalizeHistory,
  translate = Function.identity
} = {}) => {
  const {
    initiateConnection,
    startNewConversation,
    normalizeHistory,
    sendMessage,
    updateHistory
  } = createUtils({
    botName,
    webSocketUrl,
    store,
    conversationHistoryKey,
    conversationIdKey,
    normalizeHistory: _normalizeHistory
  });

  return props => {
    // normalize input.
    let {
      src: _src = botSrc,
      botSrc: _botSrc = _src,
      sendIconSrc = 'https://crossroad-venture-studio.github.io/Design-System/icons/actions/send-filled-dark.svg',
      sendIcon = sendIconSrc,
      sendSrc = sendIcon,
      containerRef,
      scrollBottom,
      scrollTop,
      hooks,
      locale = 'en',
      className
    } = props || {}, baseClassName = 'chat-feed-container';
    className = className && `${baseClassName} ${baseClassName}` || baseClassName;

    // Chatbot history.
    const [history] = useObserver(store.data, conversationHistoryKey),
    inputRef = useRef(),
    submitMessage = input => {
      if (!input && input !== 0 && input !== false) return false;

      // Send message to bot
      const type = 'chat_to_bot',
      data = {
        conversation_id: store.data[conversationIdKey],
        locale
      };
      typeof input === 'object' && (
        Array.isArray(input) && (data.array = input) || Object.assign(data, input)
      ) || (
        data.text = `${input}`
      );
  
      // Update the conversation history.
      updateHistory({ data });
  
      // Send message to bot.
      sendMessage(type, data);
  
      // Reset input.
      inputRef.current.value = '';

      return true;
    },
    onSubmitMessage = message => submitMessage(message && message.chatInput || null);

    // Scrolling functions.
    scrollBottom || (scrollBottom = (el = containerRef && containerRef.current) => (
      el && (el.scrollTop = el.scrollHeight)
    ));
    scrollTop || (scrollTop = (el = containerRef && containerRef.current) => (
      el && (el.scrollTop = 0)
    ));

    // Hooks.
    hooks && (
      hooks.reset = () => startNewConversation(true),
      hooks.scrollBottom = scrollBottom,
      hooks.scrollTop = scrollTop,
      hooks.submitMessage = submitMessage
    );

    // Initiate connection when component mounts.
    useEffect(() => {
      initiateConnection();
      Platform.isMobile && (
        document.removeEventListener('touchmove', preventDefaultEventHandler),
        document.addEventListener('touchmove', preventDefaultEventHandler),
        window.visualViewport && (
          window.visualViewport.removeEventListener('scroll', preventDefaultEventHandler),
          window.visualViewport.addEventListener('scroll', preventDefaultEventHandler)
        )
      );
    }, []);

    // useEffect to scroll to bottom of the page when history updates
    useEffect(() => {
      setTimeout(() => {
        // Scrolling to the last element.
        scrollBottom();
      }, 10);
    }, [history]);

    // Render.
    return <Form
      className='chat-feed-container'
      onSubmit={onSubmitMessage}
    >
      {_botSrc && <div className='chatbot-image-container'>
        <img className='chatbot-image' src={_botSrc}/>
        </div> || null}
      <ChatFeed history={normalizeHistory(history, submitMessage)}/>
      <Row className='gap-half chat-input'>
        <input
          enterKeyHint='send'
          ref={inputRef}
          className='fill input'
          required
          name='chat-input'
          id='chat-input'
          placeholder={`${translate('type your message here')}...`}
        />
        <Button
          className='icon chat-submit-button'
          type='submit'
          isLink
          src={sendSrc}
        />
      </Row>
    </Form>;
  };
}

// Default export.
export default createChatComponent;