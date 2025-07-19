import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/';

export const sendWhatsAppCode = (data) => axios.post(`${API_URL}send-whatsapp-code/`, data);
export const verifyWhatsAppCode = (data) => axios.post(`${API_URL}verify-whatsapp-code/`, data);

export const getProfile = (id) => axios.get(`${API_URL}profile/${id}/`);
export const updateProfile = (id, data) => axios.put(`${API_URL}profile/${id}/`, data);
export const uploadPhoto = (id, file) => {
  const formData = new FormData();
  formData.append('photo', file);
  return axios.post(`${API_URL}profile/${id}/upload_photo/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
export const analyzeImage = (file) => {
  const formData = new FormData();
  formData.append('image', file);
  return axios.post(`${API_URL}analyze-image/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
export const getJobOffers = (lat, lon, radius) =>
  axios.get(`${API_URL}job-offers/`, { params: { lat, lon, radius } }); 