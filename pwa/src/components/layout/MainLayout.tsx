'use client';

import React, { Suspense } from 'react';
import { Box, Container } from '@mui/material';
import Header from './Header';
import Sidenav from './Sidenav';
import LoadingSpinner from '../ui/LoadingSpinner';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Sidenav />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: 'background.default',
            minHeight: 'calc(100vh - 64px)', // Subtract header height
          }}
        >
          <Container maxWidth="xl">
            <Suspense fallback={<LoadingSpinner />}>
              {children}
            </Suspense>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
