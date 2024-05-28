// import http from 'api/config/apiConfig';

import { fetchApi } from "../config/configAxios";

export async function create(data) {
  return fetchApi.post('group/', data);
}

export async function edit(id, data) {
  return fetchApi.put(`group/${id}`, data);
}

export async function remove(_data) {
  return fetchApi.delete('group', { data: _data });
}

export async function groupList(data) {
  return fetchApi.get('group', { params: { ...data } });
}

export async function showOneGroup(ownerId, id) {
  return fetchApi.get(`group/${id}?owner_id=${ownerId}`);
}

export async function addUser(data) {
  return fetchApi.post('group/addUsers', data);
}

export async function removeUser(_data) {
  return fetchApi.delete('group/users', { data: _data });
}

const exportedApi = {
  groupList,
  showOneGroup,
  create,
  edit,
  remove,
  addUser,
  removeUser,
};

export default exportedApi;
