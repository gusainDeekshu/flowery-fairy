"use client";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // Data remains "fresh" for 5 minutes
        gcTime: 1000 * 60 * 30,    // Cache persists in memory for 30 minutes
        retry: 1,                 // Retry once before failing
        refetchOnWindowFocus: false, // Prevent redundant calls on tab switch
      },
    },
  }));

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}