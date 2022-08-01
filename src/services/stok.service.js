import axios from 'axios';
import authHeader from './auth-header';
const API_URL = process.env.REACT_APP_API_URL;

// const getDashboardStok = async () => {
//   return axios.get(API_URL + 'stok', { headers: authHeader() });
// };
const addStok = (data) => {
  return axios.post(API_URL + 'stok/tambahstok', data, { headers: authHeader() });
};
const getAllStok = () => {
  return axios.get(API_URL + 'stok/lihatstok', { headers: authHeader() });
};
const getStokById = (id) => {
  return axios.get(API_URL + `stok/lihatstok/${id}`, {
    headers: authHeader()
  });
};
const getStokByType = (type) => {
  return axios.get(API_URL + `stok/lihatstok/${type}`, {
    headers: authHeader()
  });
};
const getSyncStok = () => {
  return axios.put(
    API_URL + 'stok/sinkron',
    {},
    {
      headers: authHeader()
    }
  );
};
const getStokByMonth = (time) => {
  return axios.get(API_URL + 'stok/' + time, {
    headers: authHeader()
  });
};

const stokService = {
  // getDashboardStok,
  addStok,
  getAllStok,
  getStokById,
  getStokByType,
  getSyncStok,
  getStokByMonth
};
export default stokService;
