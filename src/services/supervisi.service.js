import axios from 'axios';
import authHeader from './auth-header';
const API_URL = process.env.REACT_APP_API_URL;

const addSupervisi = async (data) => {
  return axios
    .post(API_URL + 'supervisi/tambah', data, { headers: authHeader() })
    .then((response) => {
      if (response.data) {
        localStorage.setItem('child-user', JSON.stringify(response.data.petani));
        localStorage.setItem('child-token', response.data.token);
      }
      return response;
    });
};

const getAllSupervisi = async () => {
  return axios.get(API_URL + 'supervisi', { headers: authHeader() });
};

const relog = async (data) => {
  return axios
    .post(API_URL + 'supervisi/masuk', data, { headers: authHeader() })
    .then((response) => {
      if (response.data) {
        localStorage.setItem('child-user', JSON.stringify(response.data.data.petani));
        localStorage.setItem('child-token', response.data.token);
      }
      return response;
    });
};

const relogById = async (id) => {
  return axios
    .post(API_URL + 'supervisi/masuk/' + id, {}, { headers: authHeader() })
    .then((response) => {
      if (response.data) {
        localStorage.setItem('child-user', JSON.stringify(response.data.data.petani));
        localStorage.setItem('child-token', response.data.token);
      }
      return response;
    });
};

const deleteSupervisi = async (id) => {
  return axios.delete(API_URL + 'supervisi/hapus/' + id, { headers: authHeader() });
};

const supervisiService = {
  addSupervisi,
  getAllSupervisi,
  relog,
  relogById,
  deleteSupervisi
};

export default supervisiService;
