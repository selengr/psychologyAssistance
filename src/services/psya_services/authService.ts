// import http from 'api/config/apiConfig';

import { fetchApi } from "../config/configAxios";

export async function enterPhone(data) {
  return fetchApi.post('auth/enterPhone', data);
}

export async function enterCode(data) {
  return fetchApi.post('auth/enterCode', data);
}

export async function login(data) {
  return fetchApi.post('auth/login', data);
}

export async function logout(data) {
  return fetchApi.post('auth/logout', data);
}

export async function resetPassword(data) {
  return fetchApi.post('auth/resetPassword', data);
}

export async function forgetPassword(data) {
  return fetchApi.post('auth/forGETPassword', data);
}

export async function me() {
  return fetchApi.get('auth/me');
}

const exportedApi = {
  enterPhone,
  enterCode,
  login,
  logout,
  resetPassword,
  forgetPassword,
  me,
};

export default exportedApi;
