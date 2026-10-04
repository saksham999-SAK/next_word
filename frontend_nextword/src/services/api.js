const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Sends text sequence to the backend API to predict the next word.
 * @param {string} text 
 * @returns {Promise<{input: string, prediction: string, confidence?: number}>}
 */
export async function predictNextWord(text) {
  if (!text || !text.trim()) {
    throw new Error('Input text cannot be empty.');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: text.trim() }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const message = errorData.detail || `Server returned status ${response.status}`;
      throw new Error(message);
    }

    const data = await response.json();
    if (!data || typeof data.prediction === 'undefined') {
      throw new Error('Invalid response format from server.');
    }

    return data;
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Backend server is unavailable. Please make sure FastAPI is running at ' + API_BASE_URL);
    }
    throw error;
  }
}

/**
 * Checks backend health status.
 */
export async function checkBackendHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, { method: 'GET' });
    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch {
    return null;
  }
}
