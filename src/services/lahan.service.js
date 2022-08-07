import axios from 'axios';
import authHeader from './auth-header';
const API_URL = process.env.REACT_APP_API_URL;

const getAllLahan = async () => {
  return axios.get(API_URL + 'lahan', { headers: authHeader() });
};

const addLahan = async (data) => {
  return axios.post(API_URL + 'lahan/tambah', data, { headers: authHeader() });
};

const getLahanName = async () => {
  return axios.get(API_URL + 'lahan/nama', { headers: authHeader() });
};

const getLahanById = async (id) => {
  return axios.get(API_URL + 'lahan/' + id, { headers: authHeader() });
};

const editLuasRusakLahan = async (id, data) => {
  return axios.put(API_URL + 'lahan/rusak/' + id, data, { headers: authHeader() });
};

const getTipeLahan = async () => {
  return axios.get(API_URL + 'lahan/tipe', { headers: authHeader() });
};

const finishLahan = async (id, data) => {
  return axios.put(API_URL + 'lahan/selesai/' + id, data, { headers: authHeader() });
};

const cancelFinishLahan = async (id) => {
  return axios.put(API_URL + 'lahan/aktifkan/' + id, {}, { headers: authHeader() });
};

const editModal = async (id, data) => {
  return axios.put(API_URL + 'lahan/modal/' + id, data, { headers: authHeader() });
};

const deleteLahan = async (id) => {
  return axios.delete(API_URL + 'lahan/hapus/' + id, { headers: authHeader() });
};

const lahanService = {
  getAllLahan,
  addLahan,
  getLahanName,
  getLahanById,
  editLuasRusakLahan,
  getTipeLahan,
  finishLahan,
  cancelFinishLahan,
  editModal,
  deleteLahan
};
export default lahanService;
