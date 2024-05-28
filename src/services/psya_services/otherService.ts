// import http from 'api/config/apiConfig';

import { fetchApi } from "../config/configAxios";

export async function update() {
  return fetchApi.get('admin/update_DB');
}

const exportedApi = { update };

export default exportedApi;
