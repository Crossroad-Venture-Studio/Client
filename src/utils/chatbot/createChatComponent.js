import { useEffect, useRef } from 'react';
import Button from '../../core/components/atoms/Button';
import Form from '../../core/components/atoms/Form';
import Row from '../../core/components/atoms/Row';
import ChatFeed from '../../core/components/molecules/ChatFeed';
import { useObserver } from '../../core/hooks/useObserver';
import { createUtils } from './createUtils';
import '../../../utils/src/functionUtils';

// Main utility.
export const createChatComponent = ({
  name,
  botName = name,
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
    onSubmitMessage = message => {
      // Send message to bot
      const type = 'chat_to_bot',
      data = {
        text: message.chatInput,
        conversation_id: store.data[conversationIdKey],
        locale
      };
  
      // Update the conversation history.
      updateHistory({ data });
  
      // Send message to bot.
      sendMessage(type, data);
  
      // Reset input.
      inputRef.current.value = '';
    };

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
      hooks.scrollTop = scrollTop
    );

    // Initiate connection when component mounts.
    useEffect(() => {
      initiateConnection();
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
      <ChatFeed history={normalizeHistory(history)}/>
      <Row className='gap-half chat-input'>
        <input
          ref={inputRef}
          className='fill input'
          required name='chat-input'
          placeholder={`${translate('type your message here')}...`}
        />
        <Button
          className='icon'
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