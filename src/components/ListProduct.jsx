import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Box, Button } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name product', width: 200 },
  { field: 'des', headerName: 'Description', width: 400 },
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
                onClick={() => {
                    console.log('Edit action for:', params.row);
                }}
            >
                Edit
            </Button>
            <Button
                color="error"
                onClick={() => {
                    console.log('Edit action for:', params.row);
                }}
            >
                Delete
            </Button>
        </Box>
    ),
  },
];

const rows = [
  { id: 1, name: 'Snow', des: 'Jon', price: 35 },
  { id: 2, name: 'Lannister', des: 'Cersei', price: 42 },
  { id: 3, name: 'Lannister', des: 'Jaime', price: 45 },
  { id: 4, name: 'Stark', des: 'Arya', price: 16 },
  { id: 5, name: 'Targaryen', des: 'Daenerys', price: null },
  { id: 6, name: 'Melisandre', des: null, price: 150 },
  { id: 7, name: 'Clifford', des: 'Ferrara', price: 44 },
  { id: 8, name: 'Frances', des: 'Rossini', price: 36 },
  { id: 9, name: 'Roxie', des: 'Harvey', price: 65 },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function ListProduct({setAction}) {
  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
