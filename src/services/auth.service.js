import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

const signup = ({ data }) => {
  return axios
    .post(API_URL + 'auth/daftar', {
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
    .post(API_URL + 'auth/masuk', {
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

const authService = {
  signup,
  signin,
  logout
};
export default authService;
