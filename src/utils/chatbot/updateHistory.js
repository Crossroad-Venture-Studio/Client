// Helper function to update conversation history.
// History object example:
// {data: {text: '', coversation_id}, type?: "chat_to_bot" // only for user}.
export const updateHistory = (
  message,
  store,
  conversationHistoryKey = 'conversationHistory',
  log = console.log,
  err = console.error
) => {
  if (!message) return history;
  try {
    message = JSON.parse(message);
    let history = store.data[conversationHistoryKey] || [];
    message && message.data && (message.data.__date__ = Date.now());
    history = store.data[conversationHistoryKey] = [...history, message];
    typeof log === 'function' && log('History updated');
    return history;
  } catch (e) {
    typeof err === 'function' && err(e);
    return false;
  }
}

// Default export.
export default updateHistory;