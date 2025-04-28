import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import CasesRoundedIcon from '@mui/icons-material/CasesRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import BarChartIcon from '@mui/icons-material/BarChart';
import { Link, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';

export default function ShortMenu() {
  const location = useLocation();

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        bgcolor: 'background.paper',
        p: 2,
      }}
    >
      {/* Dashboard */}
      <ListItemButton
        component={Link}
        to="/"
        selected={location.pathname === '/'}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <ListItemIcon sx={{ justifyContent: 'center', minWidth: 'unset' }}>
          <DashboardRoundedIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="caption" align="center">
          Dashboard
        </Typography>
      </ListItemButton>

      {/* Add New Case */}
      <ListItemButton
        component={Link}
        to="/create-case"
        selected={location.pathname === '/create-case'}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <ListItemIcon sx={{ justifyContent: 'center', minWidth: 'unset' }}>
          <AddBoxRoundedIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="caption" align="center">
          Add Case
        </Typography>
      </ListItemButton>

      {/* Case Overview */}
      <ListItemButton
        component={Link}
        to="/cases"
        selected={location.pathname === '/cases'}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <ListItemIcon sx={{ justifyContent: 'center', minWidth: 'unset' }}>
          <CasesRoundedIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="caption" align="center">
          Cases
        </Typography>
      </ListItemButton>

      {/* Items Overview */}
      <ListItemButton
        component={Link}
        to="/items"
        selected={location.pathname === '/items'}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <ListItemIcon sx={{ justifyContent: 'center', minWidth: 'unset' }}>
          <Inventory2RoundedIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="caption" align="center">
          Items
        </Typography>
      </ListItemButton>

      {/* Reports Overview */}
      <ListItemButton
        component={Link}
        to="/reports"
        selected={location.pathname === '/reports'}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <ListItemIcon sx={{ justifyContent: 'center', minWidth: 'unset' }}>
          <CalendarMonthRoundedIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="caption" align="center">
          Reports
        </Typography>
      </ListItemButton>

      {/* Items Overview */}
      <ListItemButton
        component={Link}
        to="/stats"
        selected={location.pathname === '/stats'}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <ListItemIcon sx={{ justifyContent: 'center', minWidth: 'unset' }}>
          <BarChartIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="caption" align="center">
          Stats
        </Typography>
      </ListItemButton>
    </Box>
  );
}