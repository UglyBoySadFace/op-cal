import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  CircularProgress,
  Typography,
  Box,
  Alert,
} from '@mui/material';

import { useApiBooksGetCollection } from '../api/book/book';

// Client Component is required to use hooks like useState and useQuery
'use client';

export default function PaginatedTable() {
  // 0-indexed page state, required by MUI's TablePagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Items per page

  // 1. Fetch data using the generated hook.
  const { data, isLoading, isError, error } = useApiBooksGetCollection({page: page + 1, itemsPerPage: rowsPerPage});

  // Handlers for pagination
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0); // Reset to the first page when rows per page changes
  };

  const totalCount = data?.totalItems ?? 0;
  const users: User[] = data?.data ?? [];

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      <Typography variant="h4" component="h1" gutterBottom className="text-center font-semibold text-indigo-700 mb-6">
        Paginated Users (MUI + TanStack Query) [Image of a data table with pagination controls]
      </Typography>

      <Paper className="w-full overflow-hidden shadow-lg rounded-xl">
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="user table">

            {/* Table Header */}
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
                    className="!bg-indigo-600 text-white"
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {/* Table Body & Loading/Error States */}
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center" style={{ height: 200 }}>
                    <Box className="flex flex-col items-center justify-center">
                      <CircularProgress color="primary" />
                      <Typography variant="body1" className="mt-4 text-gray-600">Loading data...</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}

              {isError && (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center" style={{ height: 200 }}>
                    <Alert severity="error">
                      Error fetching data: {error instanceof Error ? error.message : 'Unknown error'}
                    </Alert>
                  </TableCell>
                </TableRow>
              )}

              {/* Data Rows */}
              {!isLoading && users.map((row, index) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-indigo-50'}
                >
                  {columns.map((column) => {
                    const value = row[column.id as keyof User];
                    return (
                      <TableCell key={column.id}>
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Table Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalCount} // Total number of items
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className="bg-indigo-100 border-t"
        />
      </Paper>
    </div>
  );
}
