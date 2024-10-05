import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Box, Button } from '@mui/material';

const columns = (handleEditOpen, handleDeleteProduct) => [
  { field: '_id', headerName: 'ID', width: 250 },
  { field: 'name', headerName: 'Name product', width: 200 },
  { field: 'description', headerName: 'Description', width: 400 },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    width: 200,
  },
  {
    field: 'action',
    headerName: 'Action',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    renderCell: (params) => (
      <Box>
        <Button
          color="primary"
          onClick={() => handleEditOpen(params.row)} // Gọi hàm handleEditOpen
        >
          Edit
        </Button>
        <Button
          color="error"
          onClick={() => handleDeleteProduct(params.row._id)} // Gọi hàm handleDeleteProduct
        >
          Delete
        </Button>
      </Box>
    ),
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function ListProduct({ products, handleEditOpen, handleDelete }) {
  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={products}
        columns={columns(handleEditOpen, handleDelete)} 
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}     
        getRowId={(row) => row._id} 
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
