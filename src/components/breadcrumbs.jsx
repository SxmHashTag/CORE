import React, { useEffect, useState } from 'react';
import { Breadcrumbs as MUIBreadcrumbs, Link, Typography } from '@mui/material';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import axiosInstance from '../services/api'; // Adjust the path to your Axios instance

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const [caseDetails, setCaseDetails] = useState(null);
  const [evidenceDetails, setEvidenceDetails] = useState(null);

  useEffect(() => {
    // Fetch case details only if the path is specifically for a case
    if (pathnames[0] === 'cases' && pathnames.length === 2) {
      const caseId = pathnames[1];
      axiosInstance
        .get(`/api/cases/${caseId}`) // Replace with your actual API endpoint
        .then((response) => {
          setCaseDetails(response.data); // Assuming the API returns case details including `case_number`
        })
        .catch((error) => {
          console.error('Failed to fetch case details:', error);
        });
    }

    // Fetch evidence details only if the path is specifically for an evidence item
    if (pathnames[0] === 'cases' && pathnames[2] === 'items' && pathnames.length === 4) {
      const evidenceId = pathnames[3];
      axiosInstance
        .get(`/api/items/${evidenceId}`) // Replace with your actual API endpoint
        .then((response) => {
          setEvidenceDetails(response.data); // Assuming the API returns evidence details including `evidence_number`
        })
        .catch((error) => {
          console.error('Failed to fetch evidence details:', error);
        });
    }
  }, [pathnames]);

  return (
    <MUIBreadcrumbs aria-label="breadcrumb" sx={{ marginBottom: '20px' }}>
      <Link component={RouterLink} to="/" underline="hover" color="inherit">
        Home
      </Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        // Replace the case ID with the case number if available
        let displayValue = value.charAt(0).toUpperCase() + value.slice(1);
        if (pathnames[0] === 'cases' && pathnames.length === 2 && caseDetails && isLast) {
          displayValue = `Case ${caseDetails.case_number}`;
        } else if (pathnames[0] === 'cases' && pathnames[2] === 'items' && evidenceDetails && isLast) {
          displayValue = `Evidence ${evidenceDetails.evidence_number || evidenceDetails.id}`;
        }

        return isLast ? (
          <Typography key={to} color="text.primary">
            {displayValue}
          </Typography>
        ) : (
          <Link key={to} component={RouterLink} to={to} underline="hover" color="inherit">
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Link>
        );
      })}
    </MUIBreadcrumbs>
  );
};

export default Breadcrumbs;
