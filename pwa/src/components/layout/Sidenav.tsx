'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  MenuBook as BookIcon,
  Star as ReviewIcon,
  Person as AuthorIcon,
  Category as CategoryIcon
} from '@mui/icons-material';

const navigation = [
  { name: 'Dashboard', href: '/', icon: DashboardIcon },
  { name: 'Books', href: '/books', icon: BookIcon },
  { name: 'Reviews', href: '/reviews', icon: ReviewIcon },
  { name: 'Authors', href: '/authors', icon: AuthorIcon },
  { name: 'Categories', href: '/categories', icon: CategoryIcon },
];

const drawerWidth = 256;

export default function Sidenav() {
  const pathname = usePathname();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          position: 'relative',
          border: 'none',
          borderRight: 1,
          borderColor: 'divider',
          backgroundColor: 'background.paper'
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <List>
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const IconComponent = item.icon;

            return (
              <ListItem key={item.name} disablePadding>
                <ListItemButton
                  component={Link}
                  href={item.href}
                  selected={isActive}
                  sx={{
                    borderRadius: 1,
                    mb: 0.5,
                    '&.Mui-selected': {
                      backgroundColor: 'primary.light',
                      color: 'primary.main',
                      '&:hover': {
                        backgroundColor: 'primary.light',
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive ? 'primary.main' : 'text.secondary',
                      minWidth: 40,
                    }}
                  >
                    <IconComponent />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{
                      fontWeight: isActive ? 600 : 400,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
}
