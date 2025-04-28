import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Typography, IconButton, Tooltip } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AxiosInstance from "../../services/api";

const ItemDetail = () => {
  const { id } = useParams(); // Extract item ID from URL
  const navigate = useNavigate();
  const [itemDetails, setItemDetails] = useState(null);
  const [relatedCases, setRelatedCases] = useState([]);

  useEffect(() => {
    // Fetch item details
    AxiosInstance.get(`/api/items/${id}/`)
      .then((itemRes) => {
        console.log("Item API Response:", itemRes.data);
        setItemDetails(itemRes.data);

        // Fetch the full case details using the case ID
        const caseId = itemRes.data.case; // Extract the case ID
        if (caseId) {
          AxiosInstance.get(`/api/cases/${caseId}/`)
            .then((caseRes) => {
              setRelatedCases([caseRes.data]); // Store the case details in an array
              console.log("Full Case Details:", caseRes.data);
            })
            .catch((err) => console.error("Error fetching case details:", err));
        }
      })
      .catch((err) => console.error("Error fetching item details:", err));
  }, [id]);

  const handleEdit = () => {
    // Navigate to the edit page for the item
    navigate(`/edit-items/${id}/`);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      AxiosInstance.delete(`/api/items/${id}/`)
        .then(() => {
          navigate("/items"); // Redirect to the items list after deletion
        })
        .catch((err) => console.error("Failed to delete item:", err));
    }
  };

  const columns = useMemo(
    () => [
      { accessorKey: "case_number", header: "Case Number", size: 150 },
      { accessorKey: "case_name", header: "Case Name", size: 150 },
      { accessorKey: "case_status", header: "Status", size: 150 },
      { accessorKey: "case_description", header: "Description", size: 200 },
    ],
    []
  );

  if (!itemDetails) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Item Details */}
      <Typography variant="h4" gutterBottom>
        Item Type: {itemDetails.type}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Evidence Number:</strong> {itemDetails.evidence_number}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Brand:</strong> {itemDetails.brand}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Model:</strong> {itemDetails.model}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Serial Number:</strong> {itemDetails.serial_number}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>IMEI:</strong> {itemDetails.imei}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Owner:</strong> {itemDetails.owner}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Book Date:</strong> {itemDetails.book_date}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Storage Location:</strong> {itemDetails.storage_location}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Acquisition Method:</strong> {itemDetails.acquisition_method}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Acquisition Date:</strong> {itemDetails.acquisition_date}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Description:</strong> {itemDetails.description}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Status:</strong> {itemDetails.status}
      </Typography>

      {/* Image Display */}
      {itemDetails.picture && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="body1" gutterBottom>
            <strong>Uploaded Evidence Image:</strong>
          </Typography>
          <img
            src={itemDetails.picture} // Assuming `picture` contains the image URL
            alt="Evidence"
            style={{
              maxWidth: "100%",
              height: "auto",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </Box>
      )}

      {/* Action Buttons */}
      <Box sx={{ display: "flex", gap: "10px", mt: 2 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={handleEdit}>
          Edit Item
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete Item
        </Button>
      </Box>

      {/* Related Cases Section */}
      <Typography variant="h6" sx={{ mt: 4 }}>
        Related Cases
      </Typography>
      <MaterialReactTable
        columns={columns}
        data={relatedCases}
        enableColumnActions
        enableColumnFilters
        enableSorting
        enablePagination
        enableGlobalFilter
        enableRowActions
        renderRowActions={({ row }) => (
          <Box sx={{ display: "flex", gap: "5px" }}>
            <Tooltip title="View Case">
              <IconButton
                color="primary"
                size="small"
                onClick={() => navigate(`/cases/${row.original.id}`)}
              >
                <RemoveRedEyeRoundedIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      />
    </Box>
  );
};

export default ItemDetail;