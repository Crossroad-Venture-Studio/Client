import Sockets from './sockets';
import Chatbot from './Chatbot';
import { normalizeHistory as _normalizeHistory } from './normalizeHistory';
import updateHistory from './updateHistory';

// To create a set of utils.
export const createUtils = ({
  name,
  botName = name,
  webSocketUrl,
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
  initiateConnection: (url = webSocketUrl) => Sockets[url] = new Chatbot({
    webSocketUrl: url,
    store,
    conversationHistoryKey = 'conversationHistory',
    conversationIdKey = 'conversation_id',
    log,
    err,
    onOpen,
    onMessage,
    onClose,
    onError,
    restartOnClose
  }),
  startNewConversation: async (reset = true, url = webSocketUrl) => (
    Sockets[url].startNewConversation(reset)
  ),
  normalizeHistory: (history, name = botName) => {
    const output = _normalizeHistory(history, name = botName);
    return typeof normalizeHistory === 'function' && normalizeHistory(output) || output;
  },
  sendMessage: async (type, data, url = webSocketUrl) => (
    Sockets[url].sendMessage(type, data)
  ),
  updateHistory: message => updateHistory(message, store, conversationHistoryKey)
});

// Default export.
export default createUtils;