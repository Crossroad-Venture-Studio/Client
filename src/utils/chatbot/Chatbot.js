// Helper function to update history on a store.
import updateHistory from './updateHistory';
import createId from './createId';

// Chatbot class.
export class Chatbot {
  #chatType
  #webSocketUrl
  #socket
  #store
  #conversationHistoryKey = 'conversationHistory'
  #conversationIdKey = 'conversation_id'
  #log
  #err
  #onOpen
  #onMessage
  #onClose
  #onError

  // Constructor.
  constructor({
    chatType,
    webSocketUrl,
    store,
    conversationHistoryKey = 'conversationHistory',
    conversationIdKey = 'conversation_id',
    log = console.log,
    err = console.error,
    onSocketOpened,
    onOpened = onSocketOpened,
    onOpen = onOpened,
    onMessageReceived,
    onMessage = onMessageReceived,
    onSocketClosed,
    onClosed = onSocketClosed,
    onClose = onClosed,
    onSocketError,
    onError = onSocketError,
    restartOnClose
  } = {}) {
    // Init log and err.
    this.#log = log;
    this.#err = err;

    // Init web socket.
    if (webSocketUrl) {
      webSocketUrl instanceof URL && (webSocketUrl = `${webSocketUrl}`);
      if (typeof webSocketUrl !== 'string') throw `webSocketUrl is: ${typeof webSocketUrl} --> should be a string`;
    } else throw `Invalid webSocketUrl: ${webSocketUrl} --> should be a non-empty string`;
    this.#webSocketUrl = webSocketUrl;

    // Add store and other info.
    this.#store = store;
    this.#conversationHistoryKey = conversationHistoryKey;
    this.#conversationIdKey = conversationIdKey;
    this.#onOpen = onOpen;
    this.#onMessage = message => {
      try {
        updateHistory(
          JSON.parse(message),
          this.#store,
          this.#conversationHistoryKey,
          this.#log,
          this.#err
        );
        typeof onMessage === 'function' && onMessage(...args);
      } catch (e) {
        typeof this.#err === 'function' && this.#err(e);
      }
    };
    this.#onClose = restartOnClose && ((...args) => {
      typeof onClose === 'function' && onClose(...args);
      this.restartConnection();
    }) || onClose;
    this.#onError = onError;

    // Start connection.
    this.restartConnection((...args) => {
      typeof this.#onOpen === 'function' && this.#onOpen(...args)
      this.startNewConversation(false, chatType);
    });
  }

  // Helper function to restart socket connection.
  restartConnection(onOpen = this.#onOpen) {
    // Init web socket.
    this.#socket = new WebSocket(this.#webSocketUrl);

    // Add open listener.
    this.#socket.addEventListener('open', () => {
      try {
        typeof onOpen === 'function' && onOpen(this.#socket);
        typeof this.#log === 'function' && this.#log('WebSocket connection established');
      } catch (e) {
        typeof this.#err === 'function' && this.#err(e);
      }
    });

    // Add message listener.
    this.#socket.addEventListener('message', event => {
      try {
        typeof this.#onMessage === 'function' && this.#onMessage(event.data, this.#socket);
        typeof this.#log === 'function' && this.#log('Message from server ', event.data);
      } catch (e) {
        typeof this.#err === 'function' && this.#err(e);
      }
    });

    // Add close listener.
    this.#socket.addEventListener('close', () => {
      try {
        typeof this.#onClose === 'function' && this.#onClose(this.#socket);
        typeof this.#log === 'function' && this.#log('WebSocket connection closed');
      } catch (e) {
        typeof this.#err === 'function' && this.#err(e);
      }
    });

    // Add error listener.
    this.#socket.addEventListener('error', error => {
      typeof this.#err === 'function' && this.#err(error);
      try {
        typeof this.#onError === 'function' && this.#onError(error, this.#socket);
        typeof this.#log === 'function' && this.#log(error);
      } catch (e) {
        typeof this.#err === 'function' && this.#err(e);
      }
    });

    return this;
  }

  // Method to send a message.
  sendMessage = async (type, data) => {
    const socket = this.#socket;
    return new Promise((resolve, reject) => {
      if (!socket) {
        const err = new Error('Invalid socket url, or socket url not created yet');
        typeof this.#err === 'function' && this.#err(err);
        reject(err);
      } else if (socket.readyState !== WebSocket.OPEN) {
        // Try to reopen the socket.
        this.restartConnection((...args) => {
          typeof this.#onOpen === 'function' && this.#onOpen(...args);
          this.sendMessage(type, data);
        });
      } else {
        try {
          const message = JSON.stringify({
            type,
            data
          });
          socket.send(message);
          resolve(message);
        } catch (e) {
          typeof this.#err === 'function' && this.#err(e);
          reject(e);
        }
      }
    });
  }

  // Method to start a new conversation.
  startNewConversation = async (reset = true, chatType) => {
    const data = this.#store.data,
      conversationHistoryKey = this.#conversationHistoryKey,
      conversationIdKey = this.#conversationIdKey,
      history = data[conversationHistoryKey] || [];
    typeof this.#log === 'function' && this.#log('initiateNewConversation', history, history.length);

    // Create a conversation ID on initial load.
    (!reset && data[conversationIdKey]) || (
      data[conversationIdKey] = createId(),
      typeof this.#log === 'function' && this.#log(`Create new conversation id: ${data[conversationIdKey]}`)
    );

    // Send first message.
    if ((reset || !(history && history.length)) && data[conversationIdKey]) {
      reset && (
        data[conversationHistoryKey] = []
      );
      typeof this.#log === 'function' && this.#log('SENDING INITIATE MESSAGE');
      const message = {
        text: '<INITIATE_CONVERSTAION>',
        conversation_id: data[conversationIdKey]
      };
      conversationIdKey !== 'conversation_id' && (message[conversationIdKey] = data[conversationIdKey]);
      return this.sendMessage(chatType, message);
    }
    return Promise.resolve();
  }
}

// Default export.
export default Chatbot;