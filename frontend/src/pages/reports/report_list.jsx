import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import AxiosInstance from '../../services/api';
import { useNavigate } from 'react-router-dom';

const ReportList = () => {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate(); // To navigate to the "Create Report" page

  // Fetch reports from API
  useEffect(() => {
    AxiosInstance.get('/api/reports/')
      .then((res) => setReports(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      {/* Header Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Reports
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/create-report')} // Navigate to the "Create Report" page
        >
          Add Task
        </Button>
      </Box>

      {/* Reports List */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          maxHeight: '70vh',
          overflowY: 'auto',
          p: 2,
          border: '1px solid #ccc',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9',
        }}
      >
        {reports.map((report, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{
              p: 2,
              maxWidth: '70%',
              alignSelf: index % 2 === 0 ? 'flex-start' : 'flex-end', // Alternate alignment
              backgroundColor: index % 2 === 0 ? '#e3f2fd' : '#c8e6c9', // Alternate colors
              borderRadius: '16px',
            }}
          >
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {new Date(report.date).toLocaleDateString()} {/* Format the date */}
            </Typography>
            <Typography variant="body1">{report.content}</Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default ReportList;