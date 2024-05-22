import GLOBALS from './globals';
import { createId as _createId } from './createId';
import initiateNewConversation from './initiateNewConversation';
import initiateConnection from './initiateConnection';
import { normalizeHistory as _normalizeHistory } from './normalizeHistory';
import { sendMessage as _sendMessage } from './sendMessage';
import { updateHistory as _updateHistory } from './updateHistory';

// To create a set of utils.
export const createUtils = ({
  webSocketUrl,
  userStore,
  store = userStore,
  conversationHistoryKey = 'conversationHistory',
  conversationIdKey = 'conversation_id',
  normalizeHistory,
  updateHistory = _updateHistory,
  sendMessage = _sendMessage,
  createId = _createId,
  socket = GLOBALS.socket
}) => ({
  initiateConnection: (url = webSocketUrl) => initiateConnection({
    webSocketUrl: url,
    store,
    conversationHistoryKey,
    conversationIdKey,
    updateHistory,
    sendMessage,
    createId,
    socket: socket || GLOBALS.socket
  }),
  initiateNewConversation: (reset = false) => (
    initiateNewConversation({
      reset,
      store,
      conversationHistoryKey,
      conversationIdKey,
      sendMessage,
      createId,
      socket: socket || GLOBALS.socket
    })
  ),
  normalizeHistory: (...args) => {
    const output = _normalizeHistory(...args);
    return typeof normalizeHistory === 'function' && normalizeHistory(output) || output;
  },
  sendMessage: (type, data) =>  sendMessage(type, data, socket || GLOBALS.socket),
  updateHistory: message =>  updateHistory(message, store, conversationHistoryKey)
});

// Default export.
export default createUtils;