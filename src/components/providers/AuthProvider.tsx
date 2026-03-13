'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { apiClient } from '@/lib/api-client';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, setAuth, logout } = useAuthStore();
  const [isHydrating, setIsHydrating] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Since your api-client.ts interceptor returns 'response.data',
        // 'response' here IS the object returned by NestJS: { user: { id, ... } }
        const response: any = await apiClient.get('/auth/me');
        
        // Use the user object from the response
        if (response && response.user) {
          // The interceptor handles setAccessToken automatically during 401,
          // so we grab the current token from the store to update the Auth state.
          const currentToken = useAuthStore.getState().accessToken || '';
          setAuth(response.user, currentToken);
        }
      } catch (err) {
        // If hydration fails (no cookie/invalid session), clear state
        if (isAuthenticated) {
          logout();
        }
      } finally {
        setIsHydrating(false);
      }
    };

    initAuth();
  }, []);

  // Prevent UI flickering while checking the session
  if (isHydrating) {
    return null; 
  }

  return <>{children}</>;
}