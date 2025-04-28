import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import Menu from './menu';
import ShortMenu from './short_menu';
import { IconButton } from '@mui/material';
import Breadcrumbs from './breadcrumbs';

const drawerWidth = 240;
const shortdrawerWidth = 80;
export default function Navbar({ content }) {
    // State to manage the visibility of the drawer
  const [isBigMenu, setIsBigMenu] = useState(false);

  const changeMenu = () => {
    setIsBigMenu(!isBigMenu);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* CSS Baseline for consistent styling */}
      <CssBaseline />

      {/* AppBar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton onClick={changeMenu} sx={{ marginRight : '30px' , color: 'white' }}>
            {isBigMenu ? <MenuOpenRoundedIcon /> : <MenuRoundedIcon />}
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            DIGI PROJECT
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: isBigMenu ? drawerWidth: shortdrawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: isBigMenu ? drawerWidth: shortdrawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        {/* Conditional rendering of Menu or ShortMenu */}
        {isBigMenu ? <Menu /> : <ShortMenu />}
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Breadcrumbs /> {/* Add Breadcrumbs here */}
        {content}
      </Box>
    </Box>
  );
}