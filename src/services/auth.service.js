import axios from 'axios';
import authHeader from './auth-header';
const API_URL = process.env.REACT_APP_API_URL;

const signup = ({ data }) => {
  return axios
    .post(API_URL + 'auth/signup', {
      name: data.name,
      phone: data.phone,
      email: data.email,
      password: data.password,
      provinsi: data.provinsi,
      kecamatan: data.kecamatan,
      kabupaten: data.kabupaten,
      alamat: data.alamat,
      role: data.role
    })
    .then((response) => {
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('auth-token', response.data.token);
      }
      return response;
    });
};

const signin = ({ data }) => {
  return axios
    .post(API_URL + 'auth/signin', {
      account: data.account,
      password: data.password
    })
    .then((response) => {
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('auth-token', response.data.token);
      }
      return response;
    });
};

const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('auth-token');
  localStorage.removeItem('child-user');
  localStorage.removeItem('child-token');
};

const relog = async (data) => {
  return axios
    .post(API_URL + 'supervisi/relog', data, { headers: authHeader() })
    .then((response) => {
      if (response.data) {
        localStorage.setItem('child-user', JSON.stringify(response.data.user));
        localStorage.setItem('child-token', response.data.token);
      }
      return response;
    });
};

const relogById = async (id) => {
  return axios
    .post(API_URL + 'supervisi/relog/' + id, {}, { headers: authHeader() })
    .then((response) => {
      if (response.data) {
        localStorage.setItem('child-user', JSON.stringify(response.data.user));
        localStorage.setItem('child-token', response.data.token);
      }
      return response;
    });
};

const addSupervisi = async (data) => {
  return axios
    .post(API_URL + 'supervisi/tambahsupervisi', data, { headers: authHeader() })
    .then((response) => {
      if (response.data) {
        localStorage.setItem('child-user', JSON.stringify(response.data.petani));
        localStorage.setItem('child-token', response.data.token);
      }
      return response;
    });
};

const authService = {
  signup,
  signin,
  logout,
  relog,
  relogById,
  addSupervisi
};
export default authService;
