import axios from 'axios';
import authHeader from './auth-header';
const API_URL = process.env.REACT_APP_API_URL;

const getAllUsang = async () => {
  return axios.get(API_URL + 'usang', { headers: authHeader() });
};

const getUsangById = async (id) => {
  return axios.get(API_URL + 'usang/' + id, { headers: authHeader() });
};

// const getUsangByType = async (type) => {
//   return axios.get(API_URL + 'usang/tipe/' + type, { headers: authHeader() });
// };

const deleteUsang = async (id) => {
  return axios.delete(API_URL + 'usang/hapus/' + id, { headers: authHeader() });
};

const addUsang = async (data) => {
  return axios.post(API_URL + 'usang/tambah', data, { headers: authHeader() });
};

const usangService = {
  getAllUsang,
  getUsangById,
  // getUsangByType,
  deleteUsang,
  addUsang
};
export default usangService;
