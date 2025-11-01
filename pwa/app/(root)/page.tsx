'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button
} from '@mui/material';
import {
  MenuBook as BookIcon,
  Star as ReviewIcon,
  Person as AuthorIcon,
  Category as CategoryIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { useTheme } from '../../src/components/theme/ThemeProvider';
import AddNewBook from '../../src/components/forms/AddNewBook';
import type { BookJsonld } from '../../src/api/models';

export default function HomePage() {
  const { mode, mounted } = useTheme();
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);

  const handleAddBook = (bookData: Partial<BookJsonld>) => {
    console.log('New book data:', bookData);
    // The data is now properly formatted for your API
  };

  // Don't render dynamic content until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Welcome to your book management system
          </Typography>
        </Box>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {[1, 2, 3, 4].map((index) => (
            <Grid item xs={12} sm={6} lg={3} key={index}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ mr: 2, width: 40, height: 40 }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary" fontWeight="medium">
                        Loading...
                      </Typography>
                      <Typography variant="h4" fontWeight="bold">
                        0
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </>
    );
  }

  const statsCards = [
    { title: 'Total Books', value: '0', icon: BookIcon, color: 'primary' },
    { title: 'Reviews', value: '0', icon: ReviewIcon, color: 'warning' },
    { title: 'Authors', value: '0', icon: AuthorIcon, color: 'info' },
    { title: 'Categories', value: '0', icon: CategoryIcon, color: 'success' },
  ];

  const quickActions = [
    {
      label: '+ Add new book',
      color: 'primary',
      onClick: () => setIsAddBookOpen(true)
    },
    { label: '+ Write a review', color: 'success' },
    { label: '+ Add new author', color: 'secondary' },
  ];

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Welcome to your book management system
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsCards.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <Grid item xs={12} sm={6} lg={3} key={stat.title}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ mr: 2 }}>
                      <IconComponent
                        sx={{
                          fontSize: 40,
                          color: `${stat.color}.main`
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary" fontWeight="medium">
                        {stat.title}
                      </Typography>
                      <Typography variant="h4" fontWeight="bold">
                        {stat.value}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="semibold" gutterBottom>
                Recent Activity
              </Typography>
              <Box
                sx={{
                  textAlign: 'center',
                  py: 4,
                  color: 'text.secondary'
                }}
              >
                <Typography>No recent activity</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="semibold" gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outlined"
                    color={action.color as any}
                    startIcon={<AddIcon />}
                    onClick={action.onClick}
                    sx={{
                      justifyContent: 'flex-start',
                      textAlign: 'left'
                    }}
                  >
                    {action.label}
                  </Button>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <AddNewBook
        open={isAddBookOpen}
        onClose={() => setIsAddBookOpen(false)}
        onSave={handleAddBook}
      />
    </>
  );
}
