'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Divider,
  Tooltip
} from '@mui/material';
import {
  KeyboardArrowDown as ArrowDownIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon
} from '@mui/icons-material';
import { useTheme } from '../theme/ThemeProvider';

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const { mode, toggleTheme } = useTheme();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      elevation={1}
      sx={{
        backgroundColor: 'background.paper',
        color: 'text.primary',
        borderBottom: 1,
        borderColor: 'divider'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography
            variant="h6"
            component="h1"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              '&:hover': { color: 'text.secondary' },
              transition: 'color 0.2s'
            }}
          >
            Op-Cal
          </Typography>
        </Link>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
          <Button
            component={Link}
            href="/books"
            sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
          >
            Books
          </Button>
          <Button
            component={Link}
            href="/reviews"
            sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
          >
            Reviews
          </Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
            <IconButton
              onClick={toggleTheme}
              sx={{ color: 'text.secondary' }}
              aria-label="Toggle theme"
            >
              {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Tooltip>

          <IconButton
            onClick={handleMenuOpen}
            sx={{ color: 'text.secondary' }}
            aria-label="User menu"
          >
            <ArrowDownIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem
              component={Link}
              href="/profile"
              onClick={handleMenuClose}
            >
              Profile
            </MenuItem>
            <MenuItem
              component={Link}
              href="/settings"
              onClick={handleMenuClose}
            >
              Settings
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleMenuClose}>
              Sign out
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
