// Helper function to initiate conversation.
export const initiateNewConversation = (
  reset = false,
  sendMessage,
  store,
  conversationHistoryKey = 'conversationHistory',
  conversationIdKey = 'conversation_id'
) => {
  const history = store.data[conversationHistoryKey] || [];
  console.log('initiateNewConversation', history, history.length);
  // Create a conversation ID on initial load.
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
    sendMessage('chat_to_bot', message);
  }
}

// Default export.
export default initiateNewConversation;