// Dynamic API URL constructor with Codespaces support
const getApiUrl = () => {
  // Check if running in Codespaces environment
  if (process.env.REACT_APP_CODESPACES === 'true' && process.env.REACT_APP_CODESPACE_NAME) {
    const domain = process.env.REACT_APP_GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN || 'app.github.dev';
    return `https://${process.env.REACT_APP_CODESPACE_NAME}-8081.${domain}/api`;
  }

  // Use environment variable or fallback to localhost
  return process.env.REACT_APP_API_URL || 'http://localhost:8081/api';
};

const API_URL = getApiUrl();

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'An error occurred');
  }
  return await response.json();
};

// Minimal posts API aligned with current app
const postsAPI = {
  list: async () => {
    const response = await fetch(`${API_URL}/posts`);
    return handleResponse(response);
  },
  upvote: async (postId) => {
    const response = await fetch(`${API_URL}/posts/${postId}/upvote`, { method: 'POST' });
    return handleResponse(response);
  },
  unvote: async (postId) => {
    const response = await fetch(`${API_URL}/posts/${postId}/upvote`, { method: 'DELETE' });
    return handleResponse(response);
  }
};

export { postsAPI };