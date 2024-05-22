import GLOBALS from './globals';
import initiateNewConversation from './initiateNewConversation';
import initiateWebSocketConnection from './initiateWebSocketConnection';
import handleNewMessage from './handleNewMessage';
import { sendMessage as _sendMessage } from './sendMessage';
import { updateHistory as _updateHistory } from './updateHistory';

// Helper function to initiate connection.
export const initiateConnection = ({
  webSocketUrl,
  store,
  conversationHistoryKey = 'conversationHistory',
  conversationIdKey = 'conversation_id',
  updateHistory = _updateHistory,
  sendMessage = _sendMessage,
  socketHook = GLOBALS,
  socket = GLOBALS.socket,
  onSocketOpened,
  onOpened = onSocketOpened,
  onMessageReceived,
  onSocketClosed,
  onClosed = onSocketClosed,
  onSocketError,
  onError = onSocketError
} = {}) => (
  // Initiate WebSocket connection.
  socket || initiateWebSocketConnection({
    webSocketUrl,
    onOpened: onOpened || (() => initiateNewConversation(
      false,
      store,
      conversationHistoryKey = 'conversationHistory',
      conversationIdKey = 'conversation_id',
      sendMessage,
      socket
    )),
    onMessageReceived: onMessageReceived || (data => handleNewMessage(
      data,
      store,
      conversationHistoryKey,
      updateHistory
    )),
    onClosed,
    onError,
    socketHook
  })
);

// Default export.
export default initiateConnection;