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
import { AccountCircle, Send } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import AxiosInstance from '../../services/api';

const CaseList = () => {
  const [cases, setCases] = useState([]);
  const navigate = useNavigate(); // Initialize the navigate function

  // Fetch cases from API
  const fetchCases = useCallback(() => {
    AxiosInstance.get('/api/cases/')
      .then((res) => setCases(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetchCases();
  }, [fetchCases]);

  // Define columns
  const columns = useMemo(
    () => [
      {
        id: 'caseInfo',
        header: 'Case Info',
        columns: [
          {
            accessorKey: 'case_name',
            header: 'Case Name',
            size: 250,
          },
          {
            accessorKey: 'case_number',
            header: 'Case Number',
            size: 150,
          },
        ],
      },
      {
        id: 'details',
        header: 'Details',
        columns: [
          {
            accessorKey: 'team',
            header: 'Team',
            size: 150,
          },
          {
            accessorKey: 'case_type',
            header: 'Case Type',
            size: 200,
          },
          {
            accessorKey: 'case_status',
            header: 'Case Status',
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
          {
            accessorKey: 'case_description',
            header: 'Description',
            size: 300,
          },
        ],
      },
    ],
    []
  );

  // Initialize the table
  const table = useMaterialReactTable({
    columns,
    data: cases,
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
        {/* Case Details */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
            Case Details
          </Typography>
          <Typography variant="body1">
            <strong>Case Name:</strong> {row.original.case_name || 'N/A'}
          </Typography>
          <Typography variant="body1">
            <strong>Case Number:</strong> {row.original.case_number || 'N/A'}
          </Typography>
        </Box>

        {/* Additional Details */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Typography variant="body1">
            <strong>Team:</strong> {row.original.team || 'N/A'}
          </Typography>
          <Typography variant="body1">
            <strong>Case Type:</strong> {row.original.case_type || 'N/A'}
          </Typography>
          <Typography variant="body1">
            <strong>Case Status:</strong> {row.original.case_status || 'N/A'}
          </Typography>
          <Typography variant="body1">
            <strong>Description:</strong> {row.original.case_description || 'N/A'}
          </Typography>
        </Box>
      </Box>
    ),
    renderRowActionMenuItems: ({ row, closeMenu }) => [
      <MenuItem
        key={0}
        onClick={() => {
          navigate(`/cases/${row.original.id}`); // Navigate to the case ID
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <AccountCircle />
        </ListItemIcon>
        View Case
      </MenuItem>,
      <MenuItem
        key={1}
        onClick={() => {
          // Send email logic
          closeMenu();
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
      const handleDeactivate = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert('Deactivating ' + row.getValue('case_name'));
        });
      };

      const handleActivate = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert('Activating ' + row.getValue('case_name'));
        });
      };

      return (
        <Box
          sx={(theme) => ({
            backgroundColor: lighten(theme.palette.background.default, 0.05),
            display: 'flex',
            gap: '0.5rem',
            p: '8px',
            justifyContent: 'space-between',
          })}
        >
          <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <MRT_GlobalFilterTextField table={table} />
            <MRT_ToggleFiltersButton table={table} />
          </Box>
          <Box>
            <Button
              color="error"
              disabled={!table.getIsSomeRowsSelected()}
              onClick={handleDeactivate}
              variant="contained"
            >
              Deactivate
            </Button>
            <Button
              color="success"
              disabled={!table.getIsSomeRowsSelected()}
              onClick={handleActivate}
              variant="contained"
            >
              Activate
            </Button>
          </Box>
        </Box>
      );
    },
  });

  return <MaterialReactTable table={table} />;
};

export default CaseList;
