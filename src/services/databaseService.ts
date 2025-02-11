// Initialize IndexedDB
const DB_NAME = 'traphouse_db';
const DB_VERSION = 1;

let db: IDBDatabase;

const initDB = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve();
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      // Create chat messages store
      if (!db.objectStoreNames.contains('chat_messages')) {
        const chatStore = db.createObjectStore('chat_messages', { keyPath: 'id', autoIncrement: true });
        chatStore.createIndex('user_agent', ['userId', 'agentId'], { unique: false });
      }

      // Create user interactions store
      if (!db.objectStoreNames.contains('user_interactions')) {
        const interactionStore = db.createObjectStore('user_interactions', { keyPath: 'id', autoIncrement: true });
        interactionStore.createIndex('user_agent_type', ['userId', 'agentId', 'type'], { unique: true });
      }
    };
  });
};

// Initialize the database when the service is loaded
initDB().catch(console.error);

// Chat message related operations
export async function saveChatMessage(userId: string, agentId: string, content: string, role: 'user' | 'assistant') {
  await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('chat_messages', 'readwrite');
    const store = transaction.objectStore('chat_messages');

    const message = {
      userId,
      agentId,
      content,
      role,
      createdAt: new Date().toISOString()
    };

    const request = store.add(message);

    request.onsuccess = () => resolve(message);
    request.onerror = () => reject(request.error);
  });
}

export async function getChatHistory(userId: string, agentId: string) {
  await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('chat_messages', 'readonly');
    const store = transaction.objectStore('chat_messages');
    const index = store.index('user_agent');

    const request = index.getAll([userId, agentId]);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// User interaction related operations
export async function saveUserInteraction(userId: string, agentId: string, type: 'like' | 'follow') {
  await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('user_interactions', 'readwrite');
    const store = transaction.objectStore('user_interactions');

    const interaction = {
      userId,
      agentId,
      type,
      createdAt: new Date().toISOString()
    };

    const request = store.add(interaction);

    request.onsuccess = () => resolve(interaction);
    request.onerror = () => reject(request.error);
  });
}

export async function removeUserInteraction(userId: string, agentId: string, type: 'like' | 'follow') {
  await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('user_interactions', 'readwrite');
    const store = transaction.objectStore('user_interactions');
    const index = store.index('user_agent_type');

    const request = index.getKey([userId, agentId, type]);

    request.onsuccess = () => {
      if (request.result) {
        const deleteRequest = store.delete(request.result);
        deleteRequest.onsuccess = () => resolve({ success: true });
        deleteRequest.onerror = () => reject(deleteRequest.error);
      } else {
        resolve({ success: false });
      }
    };
    request.onerror = () => reject(request.error);
  });
}

export async function getUserInteractions(userId: string) {
  await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('user_interactions', 'readonly');
    const store = transaction.objectStore('user_interactions');
    const range = IDBKeyRange.bound([userId], [userId, []], false, true);

    const request = store.getAll(range);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}