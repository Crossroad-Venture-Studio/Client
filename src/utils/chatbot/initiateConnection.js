import GLOBALS from './globals';
import initiateNewConversation from './initiateNewConversation';
import initiateWebSocketConnection from './initiateWebSocketConnection';
import handleNewMessage from './handleNewMessage';
import { sendMessage as _sendMessage } from './sendMessage';
import { updateHistory as _updateHistory } from './updateHistory';

// Helper function to initiate connection.
export const initiateConnection = (
  store,
  conversationHistoryKey = 'conversationHistory',
  conversationIdKey = 'conversation_id',
  updateHistory = _updateHistory,
  sendMessage = _sendMessage,
  socket = GLOBALS.socket
) => {
  // Initiate WebSocket connection.
  initiateWebSocketConnection(
    data => handleNewMessage(
      data,
      store,
      conversationHistoryKey,
      updateHistory
    ),
    () => initiateNewConversation(
      false,
      store,
      conversationHistoryKey = 'conversationHistory',
      conversationIdKey = 'conversation_id',
      sendMessage,
      socket
    )
  );
}

// Default export.
export default initiateConnection;