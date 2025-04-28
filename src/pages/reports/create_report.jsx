import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const CreateReport = () => {
  const [date, setDate] = useState(dayjs()); // Default to today's date
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate(); // For navigation

  const handleAddTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { date: date.format('YYYY-MM-DD'), task }]);
      setTask(''); // Clear the text field
    }
  };

  const handleCancel = () => {
    navigate('/reports'); // Navigate back to the reports list
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 600,
          mx: 'auto',
          mt: 4,
          borderRadius: 2,
          backgroundColor: '#f9f9f9',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: 'center', fontWeight: 'bold', color: '#333' }}
        >
          Daily Report Tracker
        </Typography>

        {/* Date Picker and Task Input */}
        <Box sx={{ mb: 4 }}>
          {/* Date Picker */}
          <Box sx={{ mb: 3 }}> {/* Add spacing below the DatePicker */}
            <DatePicker
              label="Select Date"
              value={date}
              onChange={(newDate) => setDate(newDate)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              )}
            />
          </Box>

          {/* Task Input */}
          <TextField
            label="Report"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            fullWidth
            multiline
            rows ={10}
            placeholder="Write your report here..."
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
        </Box>

        {/* Buttons */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddTask}
            fullWidth
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              borderRadius: 2,
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
            }}
          >
            Add Report
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCancel}
            fullWidth
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              borderRadius: 2,
              borderColor: '#1976d2',
              color: '#1976d2',
              '&:hover': {
                backgroundColor: '#e3f2fd',
              },
            }}
          >
            Cancel
          </Button>
        </Box>

        {/* Task List */}
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#333' }}
        >
          Reports for {date.format('YYYY-MM-DD')}
        </Typography>
        <List
          sx={{
            maxHeight: 200,
            overflowY: 'auto',
            backgroundColor: '#fff',
            borderRadius: 2,
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            p: 1,
          }}
        >
          {tasks
            .filter((t) => t.date === date.format('YYYY-MM-DD'))
            .map((t, index) => (
              <ListItem
                key={index}
                sx={{
                  backgroundColor: '#f5f5f5',
                  borderRadius: 2,
                  mb: 1,
                  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
                }}
              >
                <ListItemText
                  primary={t.task}
                  primaryTypographyProps={{
                    sx: { fontWeight: 'bold', color: '#333' },
                  }}
                />
              </ListItem>
            ))}
        </List>
      </Paper>
    </LocalizationProvider>
  );
};

export default CreateReport;