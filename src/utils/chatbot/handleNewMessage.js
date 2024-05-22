import { updateHistory as _updateHistory } from './updateHistory';

// Handle new messages
export const handleNewMessage = (
  data,
  store,
  conversationHistoryKey = 'conversationHistory',
  updateHistory = _updateHistory
) => {
  try {
    return updateHistory(JSON.parse(data), store, conversationHistoryKey);
  } catch (error) {
    console.error(error);
    return false;
  }
}

export default handleNewMessage;