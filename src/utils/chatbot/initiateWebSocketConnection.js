import GLOBALS from './globals';

// Initialize socket connection.
export const initiateWebSocketConnection = (
  webSocketUrl,
  onMessageReceived,
  onOpened,
  socketHook = GLOBALS
) => {
  console.log('webSocketUrl', webSocketUrl, socketHook, GLOBALS);
  const socket = (socketHook | {}).socket = new WebSocket(webSocketUrl);

  socket.addEventListener('open', () => {
    typeof onOpened === 'function' && onOpened(socket);
    console.log('WebSocket connection` established');
  });

  socket.addEventListener('message', event => {
    console.log('Message from server ', event.data);
    typeof onMessageReceived === 'function' && onMessageReceived(event.data);
  });

  socket.addEventListener('close', () => {
    console.log('WebSocket connection closed');
  });

  socket.addEventListener('error', error => {
    console.error('WebSocket error: ', error);
  });

  return socket;
};

// Default export.
export default initiateWebSocketConnection;