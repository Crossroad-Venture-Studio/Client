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
import throttle from '../../../utils/src/throttle';

// Main utility.
export const createChatComponent = ({
  setHasViewedDemoPosts,
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
      hasViewedDemoPosts,
      setChatType,
      chatType,
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
      inputRef = useRef(null),
      formRef = useRef(null),
      submitMessage = input => {
        if (!input && input !== 0 && input !== false) return false;

        // Send message to bot
        const type = chatType,
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
      [focused, setFocused] = useState();

    // Scrolling functions.
    scrollBottom || (scrollBottom = (el, behavior) => (
      (el || (el = containerRef && containerRef.current))
      && (el.scrollTo({ top: el.scrollHeight, left: 0, behavior: behavior || 'auto' }))
    ));
    scrollTop || (scrollTop = (el, behavior) => (
      (el || (el = containerRef && containerRef.current)) && (el.scrollTo({ top: 0, left: 0, behavior: behavior || 'auto' }))
    ));

    // Hooks.
    hooks || (hooks = {});
    hooks.reset = () => startNewConversation(true);
    hooks.scrollBottom = scrollBottom;
    hooks.scrollTop = scrollTop;
    hooks.submitMessage = submitMessage;
    hooks.blur = () => inputRef.current && inputRef.current.blur();
    hooks.focus = () => inputRef.current && inputRef.current.focus();

    // Initiate connection when component mounts.
    useEffect(() => {
      initiateConnection(chatType);

      // Add listeners if platform is run on mobile devices.
      Platform.isMobile && (
        // document.removeEventListener('touchmove', preventDefaultEventHandler),
        // document.addEventListener('touchmove', preventDefaultEventHandler),
        window.visualViewport && (
          window.visualViewport.addEventListener('scroll', throttle(event => {
            preventDefaultEventHandler(event);
            setTimeout(() => {
              // Scrolling to the last element.
              scrollBottom(null, 'instant');
            }, 0);
          }, 30))
        ),
        containerRef && containerRef.current && containerRef.current.addEventListener('touchmove', throttle(() => (
          inputRef.current === document.activeElement && inputRef.current.blur()
        ), 30)),
        document.body.dataset.mobile = true
      );

      inputRef?.current?.addEventListener('focus', () => setFocused(true));
      inputRef?.current?.addEventListener('blur', () => setFocused(false));
    }, []);

    // In change of history, focus, or locale: scroll down.
    useEffect(() => {
      setTimeout(() => {
        // Scrolling to the last element.
        scrollBottom(null, 'instant');
      }, 0);
    }, [history, locale, focused]);

    // Render.
    return <Form
      className={`chat-feed-container${focused && ' focused' || ''}`}
      onSubmit={onSubmitMessage}
      ref={formRef}
    >
      {_botSrc && <div className='chatbot-image-container'>
        <img className='chatbot-image' src={_botSrc} />
      </div> || null}
      <ChatFeed history={normalizeHistory(history, hooks, store)} />

      {/* Haven't viewed posts and still in demo mode */}
      {/* {((!store.data.hasViewedDemoPosts && chatType === 'chat_demo_bot') || chatType === 'chat_onboarding_bot') && */}
      <Row className='gap-half chat-input'>
        <input
          enterKeyHint='send'
          ref={inputRef}
          className='fill input'
          required
          name='chat-input'
          id='chat-input'
          onChange={throttle(() => {
            setTimeout(() => {
              // Scrolling to the last element.
              scrollBottom();
            }, 0);
          }, 500)}
          placeholder={`${translate('type your message here')}...`}
        />
        <Button
          className='icon chat-submit-button'
          type='submit'
          isLink
          src={sendSrc}
        />
      </Row>
      {/* } */}


      {/* They have viewed posts and still in demo: Show button to start onboarding. Button sets chat type to chat_bot_onboarding */}
      {store.data.hasViewedDemoPosts && chatType === 'chat_demo_bot' &&
        <Row className='gap-half chat-input'>
          <Button
            type='button'
            onClick={() => {
              // Change chat type
              setChatType('chat_bot_onboarding');

              // Send message to bot to start onboarding
              const type = 'chat_bot_onboarding',
                data = {
                  conversation_id: store.data[conversationIdKey],
                  text: 'Start Onboarding'
                };
              locale && (data.locale = locale);
              sendMessage(type, data);

              // Update the conversation history.
              updateHistory({ data });

              // Reset input.
              inputRef.current.value = '';


            }}
          >
            Start Onboarding
          </Button>
        </Row>
      }


    </Form >;
  };
}

// Default export.
export default createChatComponent;