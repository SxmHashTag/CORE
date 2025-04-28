// Import necessary libraries and components
import React, { useMemo, useEffect, useState, useCallback } from 'react';
import {
  MaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Typography,
  IconButton,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { RemoveRedEyeRounded, EditRounded } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import AxiosInstance from '../services/api';

// Main Home component
const Home = () => {
  // State to store the fetched cases and items data
  const [cases, setCases] = useState([]);
  const [items, setItems] = useState([]);

  // Function to fetch data from the API
  const fetchData = useCallback(async () => {
    try {
      const [caseResponse, itemResponse] = await Promise.all([
        AxiosInstance.get('/api/cases/'), // API call to fetch cases
        AxiosInstance.get('/api/items/'), // API call to fetch items
      ]);
      setCases(caseResponse.data); // Update the state with fetched cases data
      setItems(itemResponse.data); // Update the state with fetched items data
    } catch (error) {
      console.error('Error fetching data:', error); // Log any errors
    }
  }, []);

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Define columns for cases table
  const caseColumns = useMemo(
    () => [
      { accessorKey: 'case_number', header: 'Case Number' },
      { accessorKey: 'case_name', header: 'Case Name' },
      { accessorKey: 'team', header: 'Team' },
      { accessorKey: 'case_type', header: 'Case Type' },
      { accessorKey: 'case_status', header: 'Case Status' },
      { accessorKey: 'case_description', header: 'Description' },
    ],
    []
  );

  // Define columns for items table
  const itemColumns = useMemo(
    () => [
      { accessorKey: 'evidence_number', header: 'Evidence Number' },
      { accessorKey: 'type', header: 'Type' },
      { accessorKey: 'brand', header: 'Brand' },
      { accessorKey: 'model', header: 'Model' },
      { accessorKey: 'serial_number', header: 'Serial Number' },
      { accessorKey: 'status', header: 'Status' },
    ],
    []
  );

  return (
    <Box sx={{ padding: 2 }}>
      {/* Summary Boxes */}
      <Grid
        container
        spacing={6}
        sx={{
          mb: 3,
          justifyContent: 'center', // Center horizontally
          alignItems: 'center', // Center vertically
          textAlign: 'center', // Center text inside the cards
        }}
      >
        <Grid item xs={12} md={8}> {/* Increase width */}
          <Card sx={{ backgroundColor: '#1E88E5', color: 'white', padding: 3, height: '150px' }}> {/* Bright Blue */}
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Total Cases
              </Typography>
              <Typography variant="h3">{cases.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}> {/* Increase width */}
          <Card sx={{ backgroundColor: '#43A047', color: 'white', padding: 3, height: '150px' }}> {/* Bright Green */}
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Total Items
              </Typography>
              <Typography variant="h3">{items.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}> {/* Increase width */}
          <Card sx={{ backgroundColor: '#F4511E', color: 'white', padding: 3, height: '150px' }}> {/* Bright Orange */}
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Pending Cases
              </Typography>
              <Typography variant="h3">{cases.filter((c) => c.case_status === 'Pending').length}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Cases Table */}
      <Typography variant="h5" gutterBottom>
        All Cases
      </Typography>
      <MaterialReactTable
        columns={caseColumns}
        data={cases}
        enableColumnFilters
        enableSorting
        enablePagination
        enableGlobalFilter
        enableRowActions
        renderRowActions={({ row }) => (
          <Box sx={{ display: 'flex', gap: '10px' }}>
            <IconButton component={Link} to={`/cases/${row.original.id}`} color="primary">
              <RemoveRedEyeRounded />
            </IconButton>
            <IconButton component={Link} to={`/edit-case/${row.original.id}`} color="primary">
              <EditRounded />
            </IconButton>
          </Box>
        )}
      />

      {/* Items Table */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        All Items
      </Typography>
      <MaterialReactTable
        columns={itemColumns}
        data={items}
        enableColumnFilters
        enableSorting
        enablePagination
        enableGlobalFilter
        enableRowActions
        renderRowActions={({ row }) => (
          <Box sx={{ display: 'flex', gap: '10px' }}>
            <IconButton component={Link} to={`/items/${row.original.id}`} color="primary">
              <RemoveRedEyeRounded />
            </IconButton>
            <IconButton component={Link} to={`/edit-items/${row.original.id}`} color="primary">
              <EditRounded />
            </IconButton>
          </Box>
        )}
      />
    </Box>
  );
};

export default Home; // Export the Home component