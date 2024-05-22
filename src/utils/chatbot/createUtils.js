import GLOBALS from './globals';
import initiateNewConversation from './initiateNewConversation';
import initiateConnection from './initiateConnection';
import { normalizeHistory as _normalizeHistory } from './normalizeHistory';
import { sendMessage as _sendMessage } from './sendMessage';
import { updateHistory as _updateHistory } from './updateHistory';

// To create a set of utils.
export const createUtils = ({
  webSocketUrl,
  store,
  conversationHistoryKey = 'conversationHistory',
  conversationIdKey = 'conversation_id',
  normalizeHistory,
  updateHistory = _updateHistory,
  sendMessage = _sendMessage,
  socket = GLOBALS.socket
}) => ({
  initiateConnection: (url = webSocketUrl) => initiateConnection({
    webSocketUrl: url,
    store,
    conversationHistoryKey,
    conversationIdKey,
    updateHistory: _updateHistory,
    sendMessage: _sendMessage,
    socket
  }),
  initiateNewConversation: (reset = false) => (
    initiateNewConversation(reset, store)
  ),
  normalizeHistory: (...args) => {
    const output = _normalizeHistory(...args);
    return typeof normalizeHistory === 'function' && normalizeHistory(output) || output;
  },
  sendMessage: (type, data) =>  sendMessage(type, data, socket),
  updateHistory: message =>  updateHistory(message, store, conversationHistoryKey)
});

// Default export.
export default createUtils;