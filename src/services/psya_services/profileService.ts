// import http from 'api/config/apiConfig';
import { fetchApi } from '../config/configAxios';

export async function updateProfileInfo(data) {
  return fetchApi.post('profile/editUser', data);
}

export async function setLastRole(data) {
  return fetchApi.post(`profile/setLastRole`, data);
}

export async function ordersList(owner_id) {
  return fetchApi.get(`profile/ordersList?owner_id=${owner_id}&per_page=50`);
}

export async function paymentHistory(owner_id) {
  return fetchApi.get(`profile/paymentHistory?owner_id=${owner_id}&per_page=50`);
}

export async function shoppingCart(ownerId) {
  return fetchApi.get(`payment/shoppingCart?owner_id=${ownerId}`);
}

export async function dashboard(limit) {
  return fetchApi.get(`profile/dashboard?limit=${limit}`);
}

const exportedApi = {
  updateProfileInfo,
  setLastRole,
  ordersList,
  paymentHistory,
  shoppingCart,
  dashboard,
};

export default exportedApi;
