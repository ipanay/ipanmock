const axios = require('axios');

axios.defaults.baseURL = '/api';
const api = {
  login: '/login',
};

export default api;

export function login(data) {
  return axios({
    url: api.login,
    method: 'post',
    data: data,
  });
}
