'use client';

import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000,
    },
  },
});

/**
 * Client-side component to wrap the application with necessary contexts.
 * @param children The content of the application.
 */
export default function Providers({children}: { children: React.ReactNode }) {
  return (
    <html>
    <body>
    <AppRouterCacheProvider>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </AppRouterCacheProvider>
    </body>
    </html>
  );
}
