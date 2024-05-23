import Sockets from './sockets';
import Chatbot from './Chatbot';
import { normalizeHistory as _normalizeHistory } from './normalizeHistory';
import updateHistory from './updateHistory';

// To create a set of utils.
export const createUtils = ({
  name,
  botName = name,
  webSocketUrl: _webSocketUrl,
  userStore,
  store = userStore,
  conversationHistoryKey = 'conversationHistory',
  conversationIdKey = 'conversation_id',
  normalizeHistory,
  log,
  err,
  onSocketOpened,
  onOpened = onSocketOpened,
  onOpen = onOpened,
  onMessageReceived,
  onMessage = onMessageReceived,
  onSocketClosed,
  onClosed = onSocketClosed,
  onClose = onClosed,
  onSocketError,
  onError = onSocketError,
  restartOnClose
}) => ({
  initiateConnection: (webSocketUrl = _webSocketUrl) => Sockets[webSocketUrl] = new Chatbot({
    webSocketUrl,
    store,
    conversationHistoryKey,
    conversationIdKey,
    log,
    err,
    onOpen,
    onMessage,
    onClose,
    onError,
    restartOnClose
  }),
  startNewConversation: async (reset = true, webSocketUrl = _webSocketUrl) => (
    Sockets[webSocketUrl].startNewConversation(reset)
  ),
  normalizeHistory: (history, name = botName) => {
    const output = _normalizeHistory(history, name = botName);
    return typeof normalizeHistory === 'function' && normalizeHistory(output) || output;
  },
  sendMessage: async (type, data, webSocketUrl = _webSocketUrl) => (
    Sockets[webSocketUrl].sendMessage(type, data)
  ),
  updateHistory: message => updateHistory(message, store, conversationHistoryKey)
});

// Default export.
export default createUtils;