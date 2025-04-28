import * as React from 'react';
import { Box, Typography } from '@mui/material';

export default function MyMessage({ messageText, messageColor }) {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        marginBottom: '20px',
        backgroundColor: messageColor, 
        padding: '10px',
        alignItems: 'center',
      }}
    >
      <Typography variant="h5" gutterBottom>
        {messageText}
      </Typography>
    </Box>
  );
}