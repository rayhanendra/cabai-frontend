import axios from 'axios';
import authHeader from './auth-header';
const API_URL = process.env.REACT_APP_API_URL;

const getAllTransaksi = async () => {
  return axios.get(API_URL + 'transaksi', { headers: authHeader() });
};

const getTransaksiById = async (id) => {
  return axios.get(API_URL + 'transaksi/' + id, { headers: authHeader() });
};

const addTransaksiPetani = async (data) => {
  return axios.post(API_URL + 'transaksi/petani/tambah', data, { headers: authHeader() });
};

const addTransaksiPedagang = async (data) => {
  return axios.post(API_URL + 'transaksi/pedagang/tambah', data, { headers: authHeader() });
};

const deleteTransaksi = async (id) => {
  return axios.delete(API_URL + 'transaksi/hapus/' + id, { headers: authHeader() });
};

const acceptTransaksi = async (id) => {
  return axios.put(API_URL + 'transaksi/ubahstatus/terima/' + id, {}, { headers: authHeader() });
};

const declineTransaksi = async (id) => {
  return axios.put(API_URL + 'transaksi/ubahstatus/tolak/' + id, {}, { headers: authHeader() });
};

const editTransaksi = async ({ id, formData }) => {
  return axios.put(API_URL + 'transaksi/ubahstatus/ajukan/' + id, formData, {
    headers: authHeader()
  });
};

const getSummaryPedagang = async () => {
  return axios.get(API_URL + 'transaksi/pedagang/summary', {
    headers: authHeader()
  });
};

const getSummaryPedagangByMonth = async (month) => {
  return axios.get(API_URL + 'transaksi/pedagang/summary/' + month, {
    headers: authHeader()
  });
};

const transaksiService = {
  getAllTransaksi,
  getTransaksiById,
  addTransaksiPetani,
  addTransaksiPedagang,
  deleteTransaksi,
  acceptTransaksi,
  declineTransaksi,
  editTransaksi,
  getSummaryPedagang,
  getSummaryPedagangByMonth
};
export default transaksiService;
