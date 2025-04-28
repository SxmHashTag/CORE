import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import CasesRoundedIcon from '@mui/icons-material/CasesRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import BarChartIcon from '@mui/icons-material/BarChart';
import ArticleIcon from '@mui/icons-material/Article';
import { Link, useLocation } from 'react-router-dom';

export default function Menu() {
  const location = useLocation();

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Case Management
        </ListSubheader>
      }
    >
      {/* Dashboard */}
      <ListItemButton component={Link} to="/" selected={location.pathname === '/'}>
        <ListItemIcon>
          <DashboardRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>

      {/* Add New Case */}
      <ListItemButton component={Link} to="/create-case" selected={location.pathname === '/create-case'}>
        <ListItemIcon>
          <AddBoxRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Add New Case" />
      </ListItemButton>

      {/* Overview Section */}
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Overview
          </ListSubheader>
        }
      >
        {/* Case Overview */}
        <ListItemButton component={Link} to="/cases" selected={location.pathname === '/cases'}>
          <ListItemIcon>
            <CasesRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Cases" />
        </ListItemButton>

        {/* Item Overview */}
        <ListItemButton component={Link} to="/items" selected={location.pathname === '/items'}>
          <ListItemIcon>
            <Inventory2RoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Items" />
        </ListItemButton>
      </List>

        {/* Reports */}
        <ListItemButton component={Link} to="/reports" selected={location.pathname === '/reports'}>
          <ListItemIcon>
            <ArticleIcon />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItemButton>
      {/* Statistics */}
      <ListItemButton component={Link} to="/stats" selected={location.pathname === '/statistics'}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Statistics" />
      </ListItemButton>
    </List>
  );
}