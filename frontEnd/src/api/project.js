const axios = require('axios');
// axios.defaults.baseURL = '/api';

const api = {
  getproItemlist: '/getproItemlist',
  saveproject: '/saveproject',
  getproItem: '/getproItem'
};

export default api;

export function saveproject(data) {
  return axios({
    url: api.saveproject,
    method: 'post',
    data,
  });
}
export function getproItemlist(params) {
  return axios({
    url: api.getproItemlist,
    method: 'get',
    params,
  });
}
export function getproItem(params) {
  return axios({
    url: api.getproItem,
    method: 'get',
    params,
  });
}
