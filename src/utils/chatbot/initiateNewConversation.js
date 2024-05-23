import GLOBALS from './globals';
import { createId as _createId } from './createId';
import { sendMessage as _sendMessage } from './sendMessage';

// Helper function to initiate conversation.
export const initiateNewConversation = ({
  reset = false,
  store,
  conversationHistoryKey = 'conversationHistory',
  conversationIdKey = 'conversation_id',
  sendMessage = _sendMessage,
  createId = _createId,
  socket = GLOBALS.socket
} = {}) => {
  socket || (socket = GLOBALS.socket);
  const history = store.data[conversationHistoryKey] || [];
  console.log('initiateNewConversation', history, history.length);
  // Create a conversation ID on initial load.
  console.log('reset', reset, 'store', store, 'conversationIdKey', conversationIdKey);
  (!reset && store.data[conversationIdKey]) || (store.data[conversationIdKey] = createId());

  // Send first message.
  if ((reset || !(history && history.length)) && store.data[conversationIdKey]) {
    reset && (
      store.data[conversationHistoryKey] = []
    );
    console.log('SENDING INITIATE MESSAGE');

    const message = {
      text: '<INITIATE_CONVERSTAION>',
      conversation_id: store.data[conversationIdKey]
    };
    conversationIdKey !== 'conversation_id' && (message[conversationIdKey] = store.data[conversationIdKey]);
    sendMessage('chat_to_bot', message, socket);
  }
}

// Default export.
export default initiateNewConversation;