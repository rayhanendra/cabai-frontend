import axios from 'axios';
import authHeader from './auth-header';
const API_URL = process.env.REACT_APP_API_URL;
const LOCATION_API = 'https://dev.farizdotid.com/api/daerahindonesia/';

const getProfile = (id) => {
  return axios.get(API_URL + 'user/profile/' + id, { headers: authHeader() });
};

const getPedagangByRole = (role) => {
  return axios.get(API_URL + 'user/pedagang/' + role, { headers: authHeader() });
};

const getAllProvinsi = () => {
  return axios.get(LOCATION_API + 'provinsi');
};

const getAllKabupaten = (id_provinsi) => {
  return axios.get(LOCATION_API + 'kota?id_provinsi=' + id_provinsi);
};

const getAllKecamatan = (id_kota) => {
  return axios.get(LOCATION_API + 'kecamatan?id_kota=' + id_kota);
};

const getAllKelurahan = (id_kecamatan) => {
  return axios.get(LOCATION_API + 'kelurahan?id_kecamatan=' + id_kecamatan);
};

const userService = {
  getProfile,
  getPedagangByRole,
  getAllProvinsi,
  getAllKabupaten,
  getAllKecamatan,
  getAllKelurahan
};
export default userService;
