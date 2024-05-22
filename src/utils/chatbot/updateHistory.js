// Helper function to update conversation history.
// History object example:
// {data: {text: '', coversation_id}, type?: "chat_to_bot" // only for user}.
export const updateHistory = (
  message,
  store,
  conversationHistoryKey = 'conversationHistory'
) => {
  const history = store.data[conversationHistoryKey] || [];
  message && message.data && (message.data.__date__ = Date.now());
  return store.data[conversationHistoryKey] = [...history, message];
}

// Default export.
export default updateHistory;