import React, { useMemo, useEffect, useState, useCallback } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
} from 'material-react-table';
import {
  Box,
  Button,
  ListItemIcon,
  MenuItem,
  Typography,
  lighten,
} from '@mui/material';
import { AccountCircle, Send, RemoveRedEyeRounded, EditRounded } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import AxiosInstance from '../../services/api';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate(); // Initialize the navigate function

  // Fetch items from API
  const fetchItems = useCallback(() => {
    AxiosInstance.get('/api/items/')
      .then((res) => setItems(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // Define columns
  const columns = useMemo(
    () => [
      {
        id: 'itemInfo',
        header: 'Item Info',
        columns: [
          {
            accessorFn: (row) => `${row.type} - ${row.evidence_number}`,
            id: 'itemDetails',
            header: 'Item Details',
            size: 250,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <Typography>{renderedCellValue}</Typography>
              </Box>
            ),
          },
          {
            accessorKey: 'brand',
            header: 'Brand',
            size: 150,
          },
          {
            accessorKey: 'model',
            header: 'Model',
            size: 150,
          },
        ],
      },
      {
        id: 'details',
        header: 'Details',
        columns: [
          {
            accessorKey: 'serial_number',
            header: 'Serial Number',
            size: 150,
          },
          {
            accessorKey: 'imei',
            header: 'IMEI',
            size: 150,
          },
          {
            accessorKey: 'owner',
            header: 'Owner',
            size: 150,
          },
          {
            accessorKey: 'book_date',
            header: 'Book Date',
            size: 150,
          },
          {
            accessorKey: 'storage_location',
            header: 'Storage Location',
            size: 150,
          },
          {
            accessorKey: 'status',
            header: 'Status',
            size: 150,
            Cell: ({ cell }) => (
              <Box
                component="span"
                sx={(theme) => ({
                  backgroundColor:
                    cell.getValue() === 'Pending'
                      ? theme.palette.warning.main
                      : theme.palette.success.main,
                  borderRadius: '0.25rem',
                  color: '#fff',
                  p: '0.25rem',
                })}
              >
                {cell.getValue()}
              </Box>
            ),
          },
        ],
      },
    ],
    []
  );

  // Initialize the table
  const table = useMaterialReactTable({
    columns,
    data: items,
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowActions: true,
    enableRowSelection: true,
    initialState: {
      showColumnFilters: false,
      showGlobalFilter: true,
      columnPinning: {
        left: ['mrt-row-expand', 'mrt-row-select'],
        right: ['mrt-row-actions'],
      },
    },
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    muiSearchTextFieldProps: {
      size: 'small',
      variant: 'outlined',
    },
    muiPaginationProps: {
      color: 'secondary',
      rowsPerPageOptions: [10, 20, 30],
      shape: 'rounded',
      variant: 'outlined',
    },
    renderDetailPanel: ({ row }) => (
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column', // Stack details vertically
          justifyContent: 'center',
          gap: '1rem',
          p: 2,
          maxWidth: '1000px',
          width: '100%',
          backgroundColor: '#f9f9f9',
          borderRadius: '8px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Item Description */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
            Item Details
          </Typography>
          <Typography variant="body1">
            <strong>Description:</strong> {row.original.description || 'N/A'}
          </Typography>
        </Box>

        {/* Additional Details */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Typography variant="body1">
            <strong>Type:</strong> {row.original.type || 'N/A'}
          </Typography>
          <Typography variant="body1">
            <strong>Evidence Number:</strong> {row.original.evidence_number || 'N/A'}
          </Typography>
          <Typography variant="body1">
            <strong>Brand:</strong> {row.original.brand || 'N/A'}
          </Typography>
          <Typography variant="body1">
            <strong>Model:</strong> {row.original.model || 'N/A'}
          </Typography>
          <Typography variant="body1">
            <strong>Serial Number:</strong> {row.original.serial_number || 'N/A'}
          </Typography>
          <Typography variant="body1">
            <strong>IMEI:</strong> {row.original.imei || 'N/A'}
          </Typography>
          <Typography variant="body1">
            <strong>Owner:</strong> {row.original.owner || 'N/A'}
          </Typography>
          <Typography variant="body1">
            <strong>Book Date:</strong> {row.original.book_date || 'N/A'}
          </Typography>
          <Typography variant="body1">
            <strong>Storage Location:</strong> {row.original.storage_location || 'N/A'}
          </Typography>
          <Typography variant="body1">
            <strong>Status:</strong> {row.original.status || 'N/A'}
          </Typography>
        </Box>
      </Box>
    ),
    renderRowActionMenuItems: ({ row, openMenu }) => [
      <MenuItem
        key={0}
        onClick={() => {
          navigate(`/items/${row.original.id}`); // Navigate to the item detail page
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <AccountCircle />
        </ListItemIcon>
        View Item
      </MenuItem>,
      <MenuItem
        key={1}
        onClick={() => {
          // Send email logic
          openMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <Send />
        </ListItemIcon>
        Send Email
      </MenuItem>,
    ],
    renderTopToolbar: ({ table }) => {
      const handleAddNewEvidence = () => {
        navigate('/list-create-item'); // Navigate to the "Create Item" page
      };

      return (
        <Box
          sx={(theme) => ({
            backgroundColor: lighten(theme.palette.background.default, 0.05),
            display: 'flex',
            flexDirection: 'column', // Stack items vertically
            gap: '0.5rem',
            p: '8px',
          })}
        >
          {/* Search Box */}
          <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <MRT_GlobalFilterTextField table={table} />
            <MRT_ToggleFiltersButton table={table} />
          </Box>
        </Box>
      );
    },
  });

  return <MaterialReactTable table={table} />;
};

export default ItemList;
