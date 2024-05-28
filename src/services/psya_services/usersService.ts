// import http from 'api/config/apiConfig';

import { fetchApi } from "../config/configAxios";

export async function userList(data) {
  return fetchApi.get('user', { params: { ...data } });
}

export async function showOneUser(id, ownerId) {
  return fetchApi.get(`user/${id}?owner_id=${ownerId}`);
}

export async function editUser(id, data) {
  return fetchApi.put(`user/${id}`, data);
}

export async function assignToAssessment(data) {
  return fetchApi.post(`user/assign`, data);
}

export async function cancelUserAssign(data) {
  return fetchApi.post('user/cancelAssign', data);
}

export async function removeUser(_data) {
  return fetchApi.delete('user', { data: _data });
}

export async function registerUser(data) {
  return fetchApi.post('user', data);
}

export function addGroupUser(data) {
  return fetchApi.post(`user/importExcel`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

const exportedApi = {
  userList,
  registerUser,
  editUser,
  removeUser,
  showOneUser,
  assignToAssessment,
  cancelUserAssign,
  addGroupUser,
};

export default exportedApi;
