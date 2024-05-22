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
    initiateNewConversation,
    normalizeHistory,
    sendMessage,
    updateHistory
  } = createUtils({
    webSocketUrl,
    store,
    conversationHistoryKey,
    conversationIdKey,
    normalizeHistory: _normalizeHistory
  });

  return props => {
    // normalize input.
    let {
      containerRef,
      scrollBottom,
      scrollTop,
      hooks,
      className
    } = props || {}, baseClassName = 'chat-feed-container';
    className = className && `${baseClassName} ${baseClassName}` || baseClassName;

    // Chatbot history.
    const [history] = useObserver(store.data, conversationHistoryKey),
    inputRef = useRef(),
    onSubmitMessage = message => {
      console.log('message', message);
      // Send message to bot
      const type = 'chat_to_bot',
      data = {
        text: message.chatInput,
        conversation_id: store.data[conversationIdKey]
      };

      console.log('data', data);
  
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
      hooks.reset = () => initiateNewConversation(true)
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
          src='assets/misc/send-filled-black.svg'
        />
      </Row>
    </Form>;
  };
}

// Default export.
export default createChatComponent;