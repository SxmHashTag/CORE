import React, { useState } from "react";
import axiosInstance from "../../services/api";
import { Box, Typography, Divider, Button } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Textform from "../../components/forms/textforms";
import DiscriptionForm from "../../components/forms/discriptionforms";
import { useFormik } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import * as Yup from "yup";
import dayjs from "dayjs";
import MyMessage from "../../components/forms/message";
import { useNavigate, useParams } from "react-router-dom";
import SelectForm from "../../components/forms/selectform";

const CreateItem = () => {
  const { id } = useParams(); // Get the case ID from the URL
  const [file, setFile] = useState(null); // State to store the selected file
  const [message, setMessage] = React.useState(null);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    type: Yup.string().required("Type is required"),
    evidence_number: Yup.string().required("Evidence number is required"),
    brand: Yup.string().nullable(),
    model: Yup.string().nullable(),
    serial_number: Yup.string().nullable("Serial number is required"),
    imei: Yup.string()
      .nullable()
      .matches(/^\d{15}$/, "IMEI must be a 15-digit number"),
    owner: Yup.string().nullable(),
    book_date: Yup.date().nullable(),
    storage_location: Yup.string().required("Storage location is required"),
    acquisition_method: Yup.string().nullable(),
    acquisition_date: Yup.date().nullable(),
    description: Yup.string().nullable(),
    status: Yup.string().required("Status is required"),
    case: Yup.string().nullable("Case ID is required"),
  });

  const evidenceTypes = [
    "Laptop",
    "Smartphone",
    "Tablet",
    "USB Drive",
    "External HDD",
    "External SSD",
    "Digital Camera",
    "Smartwatch",
    "Router",
    "Server",
    "Network Device",
    "IoT Device",
    "Cloud Storage",
    "Drone",
    "Wearable Device",
    "Backup Device",
    "Smart Home Device",
    "Smart TV",
    "Game Console",
    "Other",
  ];

  const statusChoices = [
    "In Storage",
    "Under Analysis",
    "Analyzed",
    "Returned",
    "Destroyed",
    "Lost",
    "Stolen",
    "Other",
    "Pending",
    "Archived",
    "In Transit",
    "Awaiting Approval",
    "Pending Disposal",
    "Pending Return",
    "Pending Analysis",
    "Pending Review",
    "Pending Collection",
    "Pending Transfer",
    "Pending Destruction",
    "Pending Investigation",
    "Pending Confirmation",
    "Pending Documentation",
    "Pending Verification",
    "Pending Assessment",
  ];

  const formik = useFormik({
    initialValues: {
      type: "",
      evidence_number: "",
      brand: "",
      model: "",
      serial_number: "",
      imei: "",
      owner: "",
      book_date: null,
      storage_location: "",
      acquisition_method: "",
      acquisition_date: null,
      description: "",
      status: "Pending",
      case: id || "", // Use the `id` from the URL
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      if (values.book_date) {
        values.book_date = dayjs(values.book_date).format("YYYY-MM-DD");
      }
      if (values.acquisition_date) {
        values.acquisition_date = dayjs(values.acquisition_date).format("YYYY-MM-DD");
      }

      // Create FormData to include file and other form data
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
      if (file) {
        formData.append("file", file); // Add the file to the form data
      }

      axiosInstance
        .post("/api/items/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          console.log("Response from server:", response);
          setMessage(
            <MyMessage
              messageText="Item Created Successfully!"
              messageColor="#d4edda"
            />
          );
          resetForm();
          setFile(null); // Reset the file input
          setTimeout(() => navigate(`/items`), 1500);
        })
        .catch((err) => {
          console.error("Error creating item:", err.response?.data || err);
          setMessage(
            <MyMessage
              messageText="Failed to create item!"
              messageColor="#f8d7da"
            />
          );
        });
    },
  });

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Update the file state when a file is selected
  };

  return (
    <div>
      {/* Top Bar */}
      <Box
        className="TopBar"
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          backgroundColor: "#1976d2",
          color: "white",
        }}
      >
        <AddBoxIcon />
        <Typography
          sx={{ marginLeft: "15px", fontWeight: "bold" }}
          variant="subtitle2"
        >
          Add A New Item!
        </Typography>
      </Box>

      {message}

      {/* Form */}
      <form onSubmit={formik.handleSubmit}>
        <Box className="FormBox" sx={{ p: 3 }}>
          {/* Item Details */}
          <Typography variant="h6" sx={{ marginBottom: "10px" }}>
            Fill in your item details
          </Typography>
          <Divider sx={{ marginBottom: "20px" }} />
          <Box
            className="FormArea"
            sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
          >
            <SelectForm
              label="Type"
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.type && Boolean(formik.errors.type)}
              helperText={formik.touched.type && formik.errors.type}
              options={evidenceTypes.map((type) => ({
                value: type,
                label: type,
              }))}
            />
            <Textform
              label="Evidence Number"
              name="evidence_number"
              value={formik.values.evidence_number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.evidence_number &&
                Boolean(formik.errors.evidence_number)
              }
              helperText={
                formik.touched.evidence_number && formik.errors.evidence_number
              }
            />
            <Textform
              label="Brand"
              name="brand"
              value={formik.values.brand}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.brand && Boolean(formik.errors.brand)}
              helperText={formik.touched.brand && formik.errors.brand}
            />
            <Textform
              label="Model"
              name="model"
              value={formik.values.model}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.model && Boolean(formik.errors.model)}
              helperText={formik.touched.model && formik.errors.model}
            />
            <Textform
              label="Serial Number"
              name="serial_number"
              value={formik.values.serial_number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.serial_number &&
                Boolean(formik.errors.serial_number)
              }
              helperText={
                formik.touched.serial_number && formik.errors.serial_number
              }
            />
            <Textform
              label="IMEI"
              name="imei"
              value={formik.values.imei}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.imei && Boolean(formik.errors.imei)}
              helperText={formik.touched.imei && formik.errors.imei}
            />
            <Textform
              label="Owner"
              name="owner"
              value={formik.values.owner}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.owner && Boolean(formik.errors.owner)}
              helperText={formik.touched.owner && formik.errors.owner}
            />
            <SelectForm
              label="Storage Location"
              name="storage_location"
              value={formik.values.storage_location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.storage_location &&
                Boolean(formik.errors.storage_location)
              }
              helperText={
                formik.touched.storage_location &&
                formik.errors.storage_location
              }
              options={[
                { value: "Inbeslag", label: "Inbeslag" },
                { value: "Digi", label: "Digi" },
                { value: "Rst", label: "Rst" },
                { value: "See journal", label: "See journal" },
                { value: "other", label: "other" },
              ]}
            />
            <SelectForm
              label="Status"
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.status && Boolean(formik.errors.status)}
              helperText={formik.touched.status && formik.errors.status}
              options={statusChoices.map((status) => ({
                value: status,
                label: status,
              }))}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Book Date"
                value={formik.values.book_date ? dayjs(formik.values.book_date) : null}
                onChange={(newValue) =>
                  formik.setFieldValue("book_date", newValue)
                }
                renderInput={(params) => (
                  <Textform
                    {...params}
                    name="book_date"
                    onBlur={formik.handleBlur}
                  />
                )}
              />
            </LocalizationProvider>

            {/* Acquisition Method */}
            <SelectForm
              label="Acquisition Method"
              name="acquisition_method"
              value={formik.values.acquisition_method}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.acquisition_method &&
                Boolean(formik.errors.acquisition_method)
              }
              helperText={
                formik.touched.acquisition_method &&
                formik.errors.acquisition_method
              }
              options={[
                { value: "GrayKey", label: "GrayKey" },
                { value: "Cellebrite", label: "Cellebrite" },
                { value: "Other", label: "Other" },
              ]}
            />

            {/* Acquisition Date */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Acquisition Date"
                value={
                  formik.values.acquisition_date
                    ? dayjs(formik.values.acquisition_date)
                    : null
                }
                onChange={(newValue) =>
                  formik.setFieldValue("acquisition_date", newValue)
                }
                renderInput={(params) => (
                  <Textform
                    {...params}
                    name="acquisition_date"
                    onBlur={formik.handleBlur}
                  />
                )}
              />
            </LocalizationProvider>

            {/* File Upload Field */}
            <Box>
              <Typography variant="body1" sx={{ marginBottom: "5px" }}>
                Upload Evidence File
              </Typography>
              <input
                type="file"
                onChange={handleFileChange}
                style={{ display: "block", marginTop: "10px" }}
              />
            </Box>
          </Box>

          {/* Description */}
          <Divider sx={{ marginBottom: "20px" }} />
          <Box className="FormArea">
            <DiscriptionForm
              label="Description"
              rows={9}
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
          </Box>

          {/* Submit and Cancel Buttons */}
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "30px" }}
          >
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
              Add Item
            </Button>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default CreateItem;