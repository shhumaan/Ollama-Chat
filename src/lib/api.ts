/**
 * Real API client for communicating with the NestJS backend
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export async function sendMessageToBackend(prompt: string, modelId: string) {
  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, modelId }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending message to backend:', error);
    throw error;
  }
}

export async function getAvailableModels() {
  try {
    const response = await fetch(`${API_URL}/chat/models`);
    if (!response.ok) {
      console.error(`API error (${response.status}) fetching models.`);
      return []; // Return empty array on error
    }
    const models = await response.json();
    return models;
  } catch (error) {
    console.error('Error fetching models from backend:', error);
    return []; // Return empty array on error
  }
}

export async function checkBackendStatus() {
  try {
    // This is a simple health check to see if the backend is running
    // In a real implementation, you might have a dedicated health endpoint
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    
    const response = await fetch(`${API_URL}/health`, { 
      signal: controller.signal 
    }).catch(() => null);
    
    clearTimeout(timeoutId);
    
    const backendConnected = !!response && response.ok;
    // Assume ollama is running only if backend is connected AND health check didn't return 503
    const ollamaRunning = backendConnected && response?.status !== 503;

    return {
      connected: backendConnected,
      ollamaRunning: ollamaRunning, 
    };
  } catch (error) {
    return {
      connected: false,
      ollamaRunning: false,
    };
  }
} 