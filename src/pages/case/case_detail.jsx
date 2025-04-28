import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Box, Button, Typography, IconButton, Tooltip, Menu, MenuItem } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import AxiosInstance from '../../services/api';
import jsPDF from 'jspdf';

const CaseDetail = () => {
  const { id } = useParams(); // Extract case ID from URL
  const navigate = useNavigate();
  const [caseDetails, setCaseDetails] = useState(null);
  const [evidenceList, setEvidenceList] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    // Fetch case details
    AxiosInstance.get(`/api/cases/${id}/`)
      .then((res) => {
        setCaseDetails(res.data);
        setEvidenceList(res.data.evidence || []); // Assuming evidence is part of the response
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleEditCase = () => {
    // Navigate to the edit page for the case
    navigate(`/edit-case/${id}/`);
  };

  const handleEditEvidence = (row) => {
    // Navigate to the edit page for the selected evidence
    navigate(`/cases/${id}/edit-item/${row.original.id}`);
  };

  const handleViewEvidence = (row) => {
    // Navigate to the view page for the selected evidence
    navigate(`/items/${row.original.id}`);
  };

  const handleDeleteEvidence = (row) => {
    if (window.confirm('Are you sure you want to delete this evidence?')) {
      AxiosInstance.delete(`/api/items/${row.original.id}/`)
        .then(() => {
          // Remove the deleted evidence from the list
          setEvidenceList((prev) => prev.filter((item) => item.id !== row.original.id));
        })
        .catch((err) => console.error('Failed to delete evidence:', err));
    }
  };

  const handleGenerateReport = () => {
    const doc = new jsPDF();

    // Add case details to the PDF
    doc.setFontSize(16);
    doc.text('Case Report', 10, 10);
    doc.setFontSize(12);
    doc.text(`Case Name: ${caseDetails.case_name}`, 10, 20);
    doc.text(`Case Number: ${caseDetails.case_number}`, 10, 30);
    doc.text(`Team: ${caseDetails.team}`, 10, 35);
    doc.text(`Case Type: ${caseDetails.case_type}`, 10, 45);
    doc.text(`Description: ${caseDetails.case_description}`, 10, 40);
    doc.text(`Status: ${caseDetails.case_status}`, 10, 50);
    doc.text(`Start Date: ${caseDetails.case_start_date}`, 10, 55);

    // Add evidence list to the PDF
    doc.text('Evidence List:', 10, 70);
    evidenceList.forEach((item, index) => {
      doc.text(
        `${index + 1}. Evidence Number: ${item.evidence_number}, Type: ${item.type}, Brand: ${item.brand}, Model: ${item.model}, Serial Number: ${item.serial_number}, IMEI: ${item.imei}, Owner: ${item.owner}, Book Date: ${item.book_date}, Storage Location: ${item.storage_location}, Description: ${item.description}, Status: ${item.status}`,
        10,
        80 + index * 10
      );
    });

    // Save the PDF
    doc.save('case_report.pdf');
  };

  const handlePrintClick = (event) => {
    setAnchorEl(event.currentTarget); // Open the menu
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close the menu
  };

  const handlePrintOption = (option) => {
    console.log(`Printing ${option}...`); // Replace with actual print logic
    setAnchorEl(null); // Close the menu after selecting an option
  };

  const columns = useMemo(
    () => [
      { accessorKey: 'evidence_number', header: 'Evidence Number', size: 150 },
      { accessorKey: 'type', header: 'Type', size: 150 },
      { accessorKey: 'brand', header: 'Brand', size: 150 },
      { accessorKey: 'model', header: 'Model', size: 150 },
      { accessorKey: 'serial_number', header: 'Serial Number', size: 150 },
      { accessorKey: 'imei', header: 'IMEI', size: 150 },
      { accessorKey: 'owner', header: 'Owner', size: 150 },
      { accessorKey: 'book_date', header: 'Book Date', size: 150 },
      { accessorKey: 'storage_location', header: 'Storage Location', size: 150 },
      { accessorKey: 'description', header: 'Description', size: 200 },
      { accessorKey: 'status', header: 'Status', size: 150 },
    ],
    []
  );

  if (!caseDetails) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Case Details */}
      <Typography variant="h4" gutterBottom>
        Case Name: {caseDetails.case_name}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Case Number:</strong> {caseDetails.case_number}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Description:</strong> {caseDetails.case_description}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Status:</strong> {caseDetails.case_status}
      </Typography>

      {/* Buttons */}
      <Box sx={{ display: 'flex', gap: '10px', mt: 2 }}>
        {/* Back Button */}
        <Button
          variant="contained"
          color="info"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>

        {/* Edit Case Button */}
        <Button
          variant="contained"
          color="warning"
          onClick={handleEditCase}
        >
          Edit Case
        </Button>

        {/* Print Button */}
        <Button
          variant="contained"
          color="success"
          onClick={handlePrintClick}
        >
          Print
        </Button>

        {/* Print Options Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handlePrintOption('PV')}>PV</MenuItem>
          <MenuItem onClick={() => handlePrintOption('OVB')}>OVB</MenuItem>
          <MenuItem onClick={() => handlePrintOption('KVI')}>KVI</MenuItem>
        </Menu>
      </Box>

      {/* Evidence Table */}
      <Typography variant="h6" sx={{ mt: 4 }}>
        Case Evidence
      </Typography>
      <MaterialReactTable
        columns={columns}
        data={evidenceList}
        enableColumnActions
        enableColumnFilters
        enableSorting
        enablePagination
        enableGlobalFilter
        enableRowActions
        enableStickyHeader
        enableStickyFooter
        enableDensityToggle
        enableHiding
        enableFullScreenToggle
        enableSearch
        initialState={{ density: 'compact' }}
        renderTopToolbarCustomActions={() => (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/cases/${id}/create-item/`)}
          >
            Add Evidence
          </Button>
        )}
        renderRowActions={({ row }) => (
          <Box sx={{ display: 'flex', gap: '5px' }}>
            <Tooltip title="View">
              <IconButton
                color="info"
                size="small"
                onClick={() => handleViewEvidence(row)}
              >
                <RemoveRedEyeRoundedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton
                color="primary"
                size="small"
                onClick={() => handleEditEvidence(row)}
              >
                <EditRoundedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                color="error"
                onClick={() => handleDeleteEvidence(row)}
              >
                <DeleteRoundedIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      />
    </Box>
  );
};

export default CaseDetail;