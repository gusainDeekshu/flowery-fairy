import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  timeout: 10000, // 10s timeout to prevent hanging requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors for global error handling and Auth
apiClient.interceptors.response.use(
  (response) => response.data, // Automatically return data, skipping manual .json()
  (error) => {
    // Centralized logging or toast notifications
    console.error('API Error:', error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);