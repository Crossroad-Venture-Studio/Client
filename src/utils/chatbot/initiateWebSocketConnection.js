import GLOBALS from './globals';

// Initialize socket connection.
export const initiateWebSocketConnection = ({
  webSocketUrl,
  onOpened,
  onMessageReceived,
  onClosed,
  onError,
  socketHook = GLOBALS
} = {}) => {
  // Create socket.
  const socket = (socketHook || {}).socket = new WebSocket(webSocketUrl);

  // Add open listener.
  socket.addEventListener('open', () => {
    typeof onOpened === 'function' && onOpened(socket);
    console.log('WebSocket connection` established');
  });

  // Add message listener.
  socket.addEventListener('message', event => {
    console.log('Message from server ', event.data);
    typeof onMessageReceived === 'function' && onMessageReceived(event.data);
  });

  // Add close listener.
  socket.addEventListener('close', () => {
    console.log('WebSocket connection closed');
    typeof onClosed === 'function' && onClosed(socket);
  });

  // Add error listener.
  socket.addEventListener('error', error => {
    console.error('WebSocket error: ', error);
    typeof onError === 'function' && onError(socket);
  });

  return socket;
};

// Default export.
export default initiateWebSocketConnection;