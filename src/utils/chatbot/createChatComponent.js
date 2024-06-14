import { useEffect, useRef, useState } from 'react';
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
    botSrc,
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
      locale,
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
        };
      locale && (data.locale = locale);
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
    onSubmitMessage = message => submitMessage(message && message.chatInput || null),
    [focused, setFocused] = useState(),
    [normalizedHistory, setNormalizedHistory] = useState();

    // Scrolling functions.
    scrollBottom || (scrollBottom = (el, behavior) => (
      (el || (el = containerRef && containerRef.current))
        && (el.scrollTo({ top: el.scrollHeight, left: 0, behavior: behavior || 'auto' }))
    ));
    scrollTop || (scrollTop = (el, behavior) => (
      (el || (el = containerRef && containerRef.current)) && (el.scrollTo({ top: 0, left: 0, behavior: behavior || 'auto' }))
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
      const onFocus = () => setFocused(true),
        onBlur = () => setFocused(false),
        onScroll = event => {
          preventDefaultEventHandler(event);
          setTimeout(() => {
            // Scrolling to the last element.
            scrollBottom(null, 'instant');
          }, 0);
        };
      Platform.isMobile && (
        document.removeEventListener('touchmove', preventDefaultEventHandler),
        document.addEventListener('touchmove', preventDefaultEventHandler),
        window.visualViewport && (
          window.visualViewport.removeEventListener('scroll', onScroll),
          window.visualViewport.addEventListener('scroll', onScroll)
        ),
        document.body.dataset.mobile = true
      );

      // Focus / blur events.
      inputRef.current && (
        inputRef.current.removeEventListener('focus', onFocus),
        inputRef.current.addEventListener('focus', onFocus),
        inputRef.current.removeEventListener('blur', onBlur),
        inputRef.current.addEventListener('blur', onBlur)
      );
    }, []);

    // useEffect to scroll to bottom of the page when history updates
    useEffect(() => {
      setNormalizedHistory(normalizeHistory(history, submitMessage));
    }, [history, locale]);

    useEffect(() => {
      setTimeout(() => {
        // Scrolling to the last element.
        scrollBottom(null, 'instant');
      }, 0);
    }, [normalizedHistory, focused]);

    // Render.
    return normalizedHistory && <Form
      className={`chat-feed-container${focused && ' focused' || ''}`}
      onSubmit={onSubmitMessage}
    >
      {_botSrc && <div className='chatbot-image-container'>
        <img className='chatbot-image' src={_botSrc}/>
        </div> || null}
      <ChatFeed history={normalizedHistory}/>
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
    </Form> || null;
  };
}

// Default export.
export default createChatComponent;