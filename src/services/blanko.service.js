import axios from 'axios';
import authHeader from './auth-header';
const API_URL = process.env.REACT_APP_API_URL;

const getAllBlanko = async () => {
  return axios.get(API_URL + 'blanko', { headers: authHeader() });
};

const getBlankoById = async (id) => {
  return axios.get(API_URL + 'blanko/' + id, { headers: authHeader() });
};

// const getBlankoByType = async (type) => {
//   return axios.get(API_URL + 'blanko/lihatblankobytype/' + type, { headers: authHeader() });
// };

// const addBlanko = async (data) => {
//   return axios.post(API_URL + 'blanko/tambah', data, { headers: authHeader() });
// };

const checkBlanko = async (data) => {
  return axios.post(API_URL + 'blanko/daftarisian', data, { headers: authHeader() });
};

const syncBlanko = async (data) => {
  return axios.put(API_URL + 'blanko/sinkron', data, { headers: authHeader() });
};

const blankoService = {
  getAllBlanko,
  getBlankoById,
  // getBlankoByType,
  // addBlanko,
  checkBlanko,
  syncBlanko
};
export default blankoService;
