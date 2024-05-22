import GLOBALS from './globals';

// Send message.
export const sendMessage = (type, data, socket = GLOBALS.socket) => (
  (socket || (socket = GLOBALS.socket)) && socket.readyState === WebSocket.OPEN && (
    console.log('sendMessage: ', type, data),
    socket.send(JSON.stringify({
      type,
      data
    })),
    true
  ) || (
    // Socket not ready.
    console.log('socket:', socket, GLOBALS),
    console.error('WebSocket is not connected.'),
    false
  )
);

// Default export.
export default sendMessage;