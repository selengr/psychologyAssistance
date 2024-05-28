// import http from 'api/config/apiConfig';

import { fetchApi } from "../config/configAxios";

export async function registerOwner(data) {
  return fetchApi.post(`owner/register`, data);
}

export async function showList() {
  return fetchApi.get('owner');
}

const exportedApi = {
  registerOwner,
  showList,
};

export default exportedApi;
