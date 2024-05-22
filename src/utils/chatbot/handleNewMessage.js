// Handle new messages
export const handleNewMessage = (data, updateHistory) => {
  try {
    return updateHistory(JSON.parse(data));
  } catch (error) {
    console.error(error);
    return false;
  }
}

export default handleNewMessage;