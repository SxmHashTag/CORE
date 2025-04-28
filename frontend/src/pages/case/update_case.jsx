import {React, useState, useEffect } from 'react';
import AxiosInstance from '../../services/api';
import { Box, Typography, Divider, Button } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Textform from '../../components/forms/textforms';
import DiscriptionForm from '../../components/forms/discriptionforms';
import SelectForm from '../../components/forms/selectform'; // Import SelectForm
import { useFormik } from 'formik';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import MyMessage from '../../components/forms/message';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateCase = () => {
  const { id: MyId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [cases, setCases] = useState({
    case_name: null,
    case_number: null,
    team: null,
    case_type: null,
    case_status: null,
    case_description: null,
    case_start_date: null,  
  });

  const caseStatusOptions = [
    { value: 'Open', label: 'Open' },
    { value: 'Closed', label: 'Closed' },
    { value: 'Pending', label: 'Pending' },
    { value: 'In Progress', label: 'In Progress' },
  ];

  // Fetch data from the backend
  const GetData = () => {
    AxiosInstance.get(`api/cases/${MyId}/`)
      .then((response) => {
        setCases(response.data);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      await GetData();
    };
    fetchData();
  }, []);

  const validationSchema = Yup.object({
    case_name: Yup.string().required('Case name is required'),
    case_number: Yup.string().required('Case number is required'),
    team: Yup.string().required('Team is required'),
    case_type: Yup.string().nullable('Case type is required'),
    case_status: Yup.string().required('Case status is required'),
    case_description: Yup.string().nullable('Case description is required'),
    case_start_date: Yup.date().nullable().required('Case start date is required'),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      case_name: cases.case_name || '',
      case_number: cases.case_number || '',
      team: cases.team || '',
      case_type: cases.case_type || '',
      case_status: cases.case_status || '',
      case_description: cases.case_description || '',
      case_start_date: cases.case_start_date ? dayjs(cases.case_start_date) : null,
    },
    enableReinitialize: true, // Ensure formik reinitializes when `cases` changes
    validationSchema: validationSchema,

    onSubmit: (values, { resetForm }) => {
      // Convert the dayjs object to a string before submitting
      if (values.case_start_date) {
        values.case_start_date = values.case_start_date.format('YYYY-MM-DD');
      }
      // Submit the form data to the server
      AxiosInstance.put(`api/cases/${MyId}/`, values)
        .then((response) => {
          setMessage(<MyMessage messageText={"Case Successfully Updated!"} messageColor={"#d4edda"} />);
          resetForm();
          setTimeout(() => navigate('/cases'), 1500);
        })
        .catch((err) => {
          setMessage(<MyMessage messageText={"Failed to update case!"} messageColor={"#f8d7da"} />);
          console.error("Error updating case:", err);
        });
    },
  });

  if (!cases.case_name && !cases.case_number) {
    return <div>Loading...</div>; // Ensure the form only renders after data is fetched
  }

  return (
    <div>
      {/* Top Bar */}
      <Box className="TopBar" sx={{ display: 'flex', alignItems: 'center', p: 2, backgroundColor: '#1976d2', color: 'white' }}>
        <AddBoxIcon />
        <Typography sx={{ marginLeft: '15px', fontWeight: 'bold' }} variant="subtitle2">
          Edit Case!
        </Typography>
      </Box>

      {message}

      {/* Form Container */}
      <form onSubmit={formik.handleSubmit}>
        <Box className={'FormBox'} sx={{ p: 3 }}>
          {/* Case Details Section */}
          <Typography variant="h6" sx={{ marginBottom: '10px' }}>
            Edit Case Details
          </Typography>
          <Divider sx={{ marginBottom: '20px' }} />
          <Box className={'FormArea'} sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <Textform
              label={"Case Name"}
              name="case_name"
              value={formik.values.case_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.case_name && Boolean(formik.errors.case_name)}
              helperText={formik.touched.case_name && formik.errors.case_name}
            />
            <Textform
              label={"Case Number"}
              name="case_number"
              value={formik.values.case_number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.case_number && Boolean(formik.errors.case_number)}
              helperText={formik.touched.case_number && formik.errors.case_number}
            />
            <Textform
              label={"Team"}
              name="team"
              value={formik.values.team}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.team && Boolean(formik.errors.team)}
              helperText={formik.touched.team && formik.errors.team}
            />
            <Textform
              label={"Case Type"}
              name="case_type"
              value={formik.values.case_type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.case_type && Boolean(formik.errors.case_type)}
              helperText={formik.touched.case_type && formik.errors.case_type}
            />
            <SelectForm
              label={"Case Status"}
              name="case_status"
              value={formik.values.case_status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              options={caseStatusOptions}
              error={formik.touched.case_status && Boolean(formik.errors.case_status)}
              helperText={formik.touched.case_status && formik.errors.case_status}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={"Case Register Date"}
                value={formik.values.case_start_date}
                onChange={(newValue) => formik.setFieldValue('case_start_date', newValue)}
                slotProps={{
                  textField: {
                    name: "case_start_date",
                    onBlur: formik.handleBlur,
                    error: formik.touched.case_start_date && Boolean(formik.errors.case_start_date),
                    helperText: formik.touched.case_start_date && formik.errors.case_start_date,
                  },
                }}
              />
            </LocalizationProvider>
          </Box>

          {/* Case Description Section */}
          <Typography variant="h6" sx={{ marginTop: '20px', marginBottom: '10px' }}>
            Case Description
          </Typography>
          <Divider sx={{ marginBottom: '20px' }} />
          <Box className={'FormArea'}>
            <DiscriptionForm
              label={"Case Description"}
              rows={9}
              name="case_description"
              value={formik.values.case_description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.case_description && Boolean(formik.errors.case_description)}
              helperText={formik.touched.case_description && formik.errors.case_description}
            />
          </Box>

          {/* Submit and Back Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '30px' }}>
            {/* Back Button */}
            <Button
              variant="contained"
              color="error"
              onClick={() => navigate(-1)} // Navigate back to the previous page
              sx={{ mb: 2 }}
            >
              Cancel
            </Button>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mb: 2 }}
            >
              Update Case
            </Button>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default UpdateCase;
