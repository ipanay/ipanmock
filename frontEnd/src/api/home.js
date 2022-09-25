const axios = require('axios');
// axios.defaults.baseURL = '/api';

const api = {
  getprolist: '/getprolist',
};

export default api;

export function getprolist(params) {
  return axios({
    url: api.getprolist,
    method: 'get',
    params,
  });
}
