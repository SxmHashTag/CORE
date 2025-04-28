import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Select, MenuItem, FormControl, InputLabel, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axiosInstance from '../../services/api';

ChartJS.register(ArcElement, Tooltip, Legend);

const Stats = () => {
  const [timeFilter, setTimeFilter] = useState('all'); // Default filter is 'all'
  const [chartDataItems, setChartDataItems] = useState(null); // Chart data for items
  const [tableData, setTableData] = useState([]); // Table data for items
  const [chartDataAcquisition, setChartDataAcquisition] = useState(null); // Chart data for acquisition methods
  const [tableDataAcquisition, setTableDataAcquisition] = useState([]); // Table data for acquisition methods
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch data for items
  const fetchData = async () => {
    try {
      setLoading(true);
      const responseItems = await axiosInstance.get('/api/items/'); // Fetch all items

      // Process items data for type
      const items = responseItems.data; // Assuming the API returns a list of items
      const groupedItems = items.reduce((acc, item) => {
        acc[item.type] = (acc[item.type] || 0) + 1;
        return acc;
      }, {});
      const itemLabels = Object.keys(groupedItems).sort(); // Sort types alphabetically
      const itemData = itemLabels.map((type) => groupedItems[type]);

      setChartDataItems({
        labels: itemLabels,
        datasets: [
          {
            label: 'Items Distribution',
            data: itemData,
            backgroundColor: ['#1E88E5', '#43A047', '#F4511E', '#FFC107'],
            borderWidth: 1,
          },
        ],
      });

      setTableData(itemLabels.map((type, index) => ({ type, total: itemData[index] })));

      // Process items data for acquisition_method
      const groupedAcquisition = items.reduce((acc, item) => {
        acc[item.acquisition_method] = (acc[item.acquisition_method] || 0) + 1;
        return acc;
      }, {});
      const acquisitionLabels = Object.keys(groupedAcquisition).sort(); // Sort acquisition methods alphabetically
      const acquisitionData = acquisitionLabels.map((method) => groupedAcquisition[method]);

      setChartDataAcquisition({
        labels: acquisitionLabels,
        datasets: [
          {
            label: 'Acquisition Methods Distribution',
            data: acquisitionData,
            backgroundColor: ['#8E24AA', '#1E88E5', '#43A047', '#F4511E', '#FFC107'],
            borderWidth: 1,
          },
        ],
      });

      setTableDataAcquisition(
        acquisitionLabels.map((method, index) => ({ method, total: acquisitionData[index] }))
      );
    } catch (error) {
      console.error('Failed to fetch statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [timeFilter]);

  const handleTimeFilterChange = (event) => {
    setTimeFilter(event.target.value);
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
        Statistics Dashboard
      </Typography>

      {/* Filters */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Time Filter</InputLabel>
            <Select value={timeFilter} onChange={handleTimeFilterChange} label="Time Filter">
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="day">Day</MenuItem>
              <MenuItem value="week">Week</MenuItem>
              <MenuItem value="month">Month</MenuItem>
              <MenuItem value="year">Year</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Distribution Sections */}
      <Grid container spacing={4}>
        {/* Items Distribution Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, backgroundColor: '#fff' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#555' }}>
              Items Distribution
            </Typography>
            <Grid container spacing={2}>
              {/* Chart */}
              <Grid item xs={12} md={6}>
                {loading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                    <CircularProgress />
                  </Box>
                ) : chartDataItems ? (
                  <Pie data={chartDataItems} />
                ) : (
                  <Typography>No data available</Typography>
                )}
              </Grid>

              {/* Table */}
              <Grid item xs={12} md={6}>
                {loading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <TableContainer component={Paper} sx={{ borderRadius: 2, maxHeight: '400px', overflowY: 'auto' }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 'bold', color: '#555' }}>Type</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 'bold', color: '#555' }}>Total</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tableData.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell>{row.type}</TableCell>
                            <TableCell align="right">{row.total}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Acquisition Methods Distribution Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, backgroundColor: '#fff' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#555' }}>
              Acquisition Methods Distribution
            </Typography>
            <Grid container spacing={2}>
              {/* Chart */}
              <Grid item xs={12} md={6}>
                {loading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                    <CircularProgress />
                  </Box>
                ) : chartDataAcquisition ? (
                  <Pie data={chartDataAcquisition} />
                ) : (
                  <Typography>No data available</Typography>
                )}
              </Grid>

              {/* Table */}
              <Grid item xs={12} md={6}>
                {loading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <TableContainer component={Paper} sx={{ borderRadius: 2, maxHeight: '400px', overflowY: 'auto' }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 'bold', color: '#555' }}>Acquisition Method</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 'bold', color: '#555' }}>Total</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tableDataAcquisition.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell>{row.method}</TableCell>
                            <TableCell align="right">{row.total}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Stats;