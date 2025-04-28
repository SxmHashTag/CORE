import React from 'react';
import axiosInstance from '../../services/api';
import { Box, Typography, Divider, Button } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Textform from '../../components/forms/textforms';
import DiscriptionForm from '../../components/forms/discriptionforms';
import { useFormik } from 'formik';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import MyMessage from '../../components/forms/message';
import { useNavigate } from 'react-router-dom';
import SelectForm from '../../components/forms/selectform';

const CreateCase = () => {
  const validationSchema = Yup.object({
    case_name: Yup.string().required('Case name is required'),
    case_number: Yup.string().required('Case number is required'),
    team: Yup.string().required('Team is required'),
    case_type: Yup.string().nullable('Case type is required'),
    case_status: Yup.string().nullable('Case status is required'),
    case_description: Yup.string().nullable('Case description is required'),
    case_start_date: Yup.date().nullable().required('Case start date is required'),
  });

  const [message, setMessage] = React.useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      case_name: '',
      case_number: '',
      team: '',
      case_type: '',
      case_status: '',
      case_description: '',
      case_start_date: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      if (values.case_start_date) {
        values.case_start_date = values.case_start_date.format('YYYY-MM-DD');
      }
      axiosInstance.post('/api/cases/', values)
        .then(() => {
          setMessage(<MyMessage messageText="Case Created Successfully!" messageColor="#d4edda" />);
          resetForm();
          setTimeout(() => navigate('/cases'), 1500);
        })
        .catch((err) => {
          setMessage(<MyMessage messageText="Failed to create case!" messageColor="#f8d7da" />);
          console.error(err);
        });
    },
  });

  return (
    <div>
      {/* Top Bar */}
      <Box className="TopBar" sx={{ display: 'flex', alignItems: 'center', p: 2, backgroundColor: '#1976d2', color: 'white' }}>
        <AddBoxIcon />
        <Typography sx={{ marginLeft: '15px', fontWeight: 'bold' }} variant="subtitle2">
          Create A New Case!
        </Typography>
      </Box>

      {message}

      {/* Form */}
      <form onSubmit={formik.handleSubmit}>
        <Box className="FormBox" sx={{ p: 3 }}>
          {/* Case Details */}
          <Typography variant="h6" sx={{ marginBottom: '10px' }}>
            Fill in your case details
          </Typography>
          <Divider sx={{ marginBottom: '20px' }} />
          <Box className="FormArea" sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <Textform
              label="Case Name"
              name="case_name"
              value={formik.values.case_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.case_name && Boolean(formik.errors.case_name)}
              helperText={formik.touched.case_name && formik.errors.case_name}
            />
            <Textform
              label="Case Number"
              name="case_number"
              value={formik.values.case_number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.case_number && Boolean(formik.errors.case_number)}
              helperText={formik.touched.case_number && formik.errors.case_number}
            />
            <Textform
              label="Team"
              name="team"
              value={formik.values.team}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.team && Boolean(formik.errors.team)}
              helperText={formik.touched.team && formik.errors.team}
            />
            <Textform
              label="Case Type"
              name="case_type"
              value={formik.values.case_type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.case_type && Boolean(formik.errors.case_type)}
              helperText={formik.touched.case_type && formik.errors.case_type}
            />
            <SelectForm
              label="Case Status"
              name="case_status"
              value={formik.values.case_status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.case_status && Boolean(formik.errors.case_status)}
              helperText={formik.touched.case_status && formik.errors.case_status}
              options={[
                { value: 'Open', label: 'Open' },
                { value: 'Closed', label: 'Closed' },
                { value: 'Pending', label: 'Pending' },
                { value: 'In Progress', label: 'In Progress' },
                { value: 'Resolved', label: 'Resolved' },
                { value: 'Archived', label: 'Archived' },
                { value: 'On Hold', label: 'On Hold' },
                { value: 'Cancelled', label: 'Cancelled' },
              ]}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Case Start Date"
                value={formik.values.case_start_date ? dayjs(formik.values.case_start_date) : null}
                onChange={(newValue) => formik.setFieldValue('case_start_date', newValue)}
                renderInput={(params) => (
                  <Textform
                    {...params}
                    name="case_start_date"
                    onBlur={formik.handleBlur}
                  />
                )}
              />
            </LocalizationProvider>
          </Box>

          {/* Case Description */}

          <Divider sx={{ marginBottom: '20px' }} />
          <Box className="FormArea">
            <DiscriptionForm
              label="Case Description/Notes"
              rows={9}
              name="case_description"
              value={formik.values.case_description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.case_description && Boolean(formik.errors.case_description)}
              helperText={formik.touched.case_description && formik.errors.case_description}
            />
          </Box>

          {/* Submit and Cancel Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '30px' }}>
            {/* Cancel Button */}
            <Button
              variant="contained"
              color="error"
              onClick={() => navigate(-1)} // Navigate back to the previous page
            >
              Cancel
            </Button>

            {/* Submit Button */}
            <Button type="submit" variant="contained" color="primary">
              Add Case
            </Button>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default CreateCase;