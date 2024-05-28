// import http from 'api/config/apiConfig';
import { fetchApi } from '../config/configAxios';

export async function cancelOrder(data) {
  return fetchApi.post('payment/cancelOrder', data);
}

export async function changeCount(data) {
  return fetchApi.post('payment/changeCount', data);
}

export async function discountCode(ownerId, couponCode) {
  return fetchApi.post(`payment/discountCode?owner_id=${ownerId}&discount_code=${couponCode}`);
}

export async function verify(data) {
  return fetchApi.post('payment/verify', data);
}

export async function payWithBank(data) {
  return fetchApi.post(`payment/pay`, data);
}

const exportedApi = {
  cancelOrder,
  changeCount,
  discountCode,
  verify,
  payWithBank,
};

export default exportedApi;
