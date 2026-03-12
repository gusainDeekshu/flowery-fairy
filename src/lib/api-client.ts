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
    const status = error.response?.status;
    let message = "An unexpected error occurred";

    // 1. Handle specific HTTP Status Codes
    if (status === 500) {
      // Branding specific message for server crashes
      message = "🌸 Something went wrong on our end. Please try again later.";
    } else if (status === 403) {
      message = "You do not have permission to perform this action.";
    } else if (status === 401) {
      message = error.response?.data?.message || "Please login to continue.";
    } else {
      // Fallback for 400s and other errors
      message = error.response?.data?.message || error.message || message;
    }

    // 2. Centralized logging for developers (only in console)
    console.error(`[API Error ${status}]:`, error.response?.data || error.message);

    // 3. Reject with the string so toast.error(err) works perfectly
    return Promise.reject(message);
}
);