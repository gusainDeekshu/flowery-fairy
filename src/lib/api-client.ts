import { useAuthStore } from '@/store/useAuthStore';
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  timeout: 10000,
  withCredentials: true, // MANDATORY for receiving/sending HttpOnly cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach the in-memory Access Token
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: Handle Data Extraction and Token Rotation
apiClient.interceptors.response.use(
  (response) => response.data, 
  async (error) => {
    const status = error.response?.status;
    const originalRequest = error.config;
    let message = "An unexpected error occurred";

    // --- TOKEN ROTATION LOGIC ---
    // If 401 Unauthorized and we haven't tried refreshing yet
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Attempt to get a new access token using the Refresh Cookie
        const refreshResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, 
          {}, 
          { withCredentials: true }
        );

        const newAccessToken = refreshResponse.data.access_token;
        
        // Update the Zustand store with the new token
        useAuthStore.getState().setAccessToken(newAccessToken);

        // Update the header and retry the original failed request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed (cookie expired or invalid) -> Logout user
        useAuthStore.getState().logout();
        return Promise.reject("Session expired. Please login again.");
      }
    }

    // --- GLOBAL ERROR HANDLING ---
    if (status === 500) {
      message = "🌸 Something went wrong on our end. Please try again later.";
    } else if (status === 403) {
      message = "You do not have permission to perform this action.";
    } else if (status === 401) {
      message = error.response?.data?.message || "Please login to continue.";
    } else {
      message = error.response?.data?.message || error.message || message;
    }

    console.error(`[API Error ${status}]:`, error.response?.data || error.message);
    return Promise.reject(message);
  }
);