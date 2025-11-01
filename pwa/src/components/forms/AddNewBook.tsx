'use client';

import React, { useState } from 'react';
import { apiBooksPost } from "../../api/book/book";
import type { BookJsonld } from "../../api/models";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Grid,
  IconButton,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  Close as CloseIcon,
  Save as SaveIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';

interface AddNewBookProps {
  open: boolean;
  onClose: () => void;
  onSave: (bookData: Partial<BookJsonld>) => void;
}

// Create a form-friendly type based on BookJsonld
interface BookFormData {
  author: string;
  title: string;
  isbn: string;
  publicationDate: string;
  description: string;
  category: string;
  publisher: string;
  pages: number | '';
}

const categories = [
  'Fiction',
  'Non-Fiction',
  'Science Fiction',
  'Fantasy',
  'Mystery',
  'Biography',
  'History',
  'Science',
  'Technology',
  'Business',
  'Self-Help',
  'Other'
];

export default function AddNewBook({ open, onClose, onSave }: AddNewBookProps) {
  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    author: '',
    isbn: '',
    publicationDate: '',
    description: '',
    category: '',
    publisher: '',
    pages: ''
  });

  const [errors, setErrors] = useState<Partial<BookFormData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof BookFormData) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = field === 'pages' ?
      (event.target.value === '' ? '' : Number(event.target.value)) :
      event.target.value;

    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleSelectChange = (field: keyof BookFormData) => (
    event: any
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<BookFormData> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }

    if (formData.isbn && !/^\d{10}(\d{3})?$/.test(formData.isbn.replace(/-/g, ''))) {
      newErrors.isbn = 'Please enter a valid ISBN (10 or 13 digits)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        // Convert form data to BookJsonld format
        const bookData: Partial<BookJsonld> = {
          author: formData.author,
          body: {
            title: formData.title,
            isbn: formData.isbn || undefined,
            publicationDate: formData.publicationDate || undefined,
            description: formData.description || undefined,
            category: formData.category || undefined,
            publisher: formData.publisher || undefined,
            pages: formData.pages || undefined,
          }
        };

        await apiBooksPost(bookData);
        onSave(bookData);
        handleClose();
      } catch (error) {
        console.error('Error saving book:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      author: '',
      isbn: '',
      publicationDate: '',
      description: '',
      category: '',
      publisher: '',
      pages: ''
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="div">
            Add New Book
          </Typography>
          <IconButton
            onClick={handleClose}
            sx={{ color: 'text.secondary' }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                label="Title"
                value={formData.title}
                onChange={handleInputChange('title')}
                error={!!errors.title}
                helperText={errors.title}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                label="Author"
                value={formData.author}
                onChange={handleInputChange('author')}
                error={!!errors.author}
                helperText={errors.author}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="ISBN"
                value={formData.isbn}
                onChange={handleInputChange('isbn')}
                error={!!errors.isbn}
                helperText={errors.isbn || 'Optional: 10 or 13 digit ISBN'}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Publication Date"
                type="date"
                value={formData.publicationDate}
                onChange={handleInputChange('publicationDate')}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData.category}
                  onChange={handleSelectChange('category')}
                  label="Category"
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Publisher"
                value={formData.publisher}
                onChange={handleInputChange('publisher')}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Number of Pages"
                type="number"
                value={formData.pages}
                onChange={handleInputChange('pages')}
                error={!!errors.pages}
                helperText={errors.pages}
                variant="outlined"
                inputProps={{ min: 1 }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleInputChange('description')}
                variant="outlined"
                placeholder="Brief description of the book..."
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, gap: 1 }}>
        <Button
          onClick={handleClose}
          startIcon={<CancelIcon />}
          variant="outlined"
          color="inherit"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          startIcon={<SaveIcon />}
          variant="contained"
          color="primary"
          disabled={isLoading}
        >
          {isLoading ? 'Adding...' : 'Add Book'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
