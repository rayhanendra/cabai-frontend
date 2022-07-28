import axios from 'axios';
import authHeader from './auth-header';
const API_URL = process.env.REACT_APP_API_URL;

const getAllUsang = async () => {
  return axios.get(API_URL + 'usang/lihatusang', { headers: authHeader() });
};

const getUsangById = async (id) => {
  return axios.get(API_URL + 'usang/lihatusang/' + id, { headers: authHeader() });
};

const getUsangByType = async (type) => {
  return axios.get(API_URL + 'usang/lihatusangbytype/' + type, { headers: authHeader() });
};

const deleteUsang = async (id) => {
  return axios.delete(API_URL + 'usang/hapususang/' + id, { headers: authHeader() });
};

const addUsang = async (data) => {
  return axios.post(API_URL + 'usang/tambahusang', data, { headers: authHeader() });
};

const usangService = {
  getAllUsang,
  getUsangById,
  getUsangByType,
  deleteUsang,
  addUsang
};
export default usangService;
