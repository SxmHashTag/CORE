import axios from 'axios';

// Base Axios instance
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/', // Replace with your actual base URL
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Dynamically set the Authorization token
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// API Methods

// Fetch all cases
export const fetchCases = () => api.get('/cases');

// Create a new case
export const createCase = (caseData) => api.post('/cases', caseData);

// Fetch a case by ID
export const fetchCaseById = (caseId) => api.get(`/cases/${caseId}`);

// Update a case
export const updateCase = (caseId, caseData) => api.put(`/cases/${caseId}`, caseData);

// Delete a case
export const deleteCase = (caseId) => api.delete(`/cases/${caseId}`);

// Add evidence
export const addEvidence = (evidence) => api.post('/items', items);

// Fetch evidence by ID
export const fetchEvidenceById = (evidenceId) => api.get(`/items/${itemId}`);

// Update evidence
export const updateEvidence = (evidenceId, evidenceData) => api.put(`/items/${itemId}`, evidenceData);

// Delete evidence
export const deleteEvidence = (evidenceId) => api.delete(`/items/${itemId}`);

// Generate report
export const generateReport = (caseId) => api.post('/reports', { caseId });

export default api;