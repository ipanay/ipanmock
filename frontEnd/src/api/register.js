const axios = require('axios');

// axios.defaults.baseURL = '/api';
const api = {
  register: '/register',
};

export default api;

export function register(data) {
  return axios({
    url: api.register,
    method: 'post',
    data,
  });
}
