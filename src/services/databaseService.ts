import { Pool } from 'pg';

// Initialize the connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test the database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Database connected successfully');
  }
});

// Helper function to execute queries
export async function query(text: string, params?: any[]) {
  try {
    const result = await pool.query(text, params);
    return result.rows;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Chat message related queries
export async function saveChatMessage(userId: string, agentId: string, content: string, role: 'user' | 'assistant') {
  const text = `
    INSERT INTO chat_messages (user_id, agent_id, content, role, created_at)
    VALUES ($1, $2, $3, $4, NOW())
    RETURNING *
  `;
  const values = [userId, agentId, content, role];
  return query(text, values);
}

export async function getChatHistory(userId: string, agentId: string) {
  const text = `
    SELECT * FROM chat_messages
    WHERE user_id = $1 AND agent_id = $2
    ORDER BY created_at ASC
  `;
  const values = [userId, agentId];
  return query(text, values);
}

// User interaction related queries
export async function saveUserInteraction(userId: string, agentId: string, type: 'like' | 'follow') {
  const text = `
    INSERT INTO user_interactions (user_id, agent_id, interaction_type, created_at)
    VALUES ($1, $2, $3, NOW())
    ON CONFLICT (user_id, agent_id, interaction_type)
    DO NOTHING
    RETURNING *
  `;
  const values = [userId, agentId, type];
  return query(text, values);
}

export async function removeUserInteraction(userId: string, agentId: string, type: 'like' | 'follow') {
  const text = `
    DELETE FROM user_interactions
    WHERE user_id = $1 AND agent_id = $2 AND interaction_type = $3
    RETURNING *
  `;
  const values = [userId, agentId, type];
  return query(text, values);
}

export async function getUserInteractions(userId: string) {
  const text = `
    SELECT * FROM user_interactions
    WHERE user_id = $1
  `;
  const values = [userId];
  return query(text, values);
}