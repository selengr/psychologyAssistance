// import http from 'api/config/apiConfig';

import { fetchApi } from "../config/configAxios";

export async function userList(data:any) {
  return fetchApi.get('admin/users', { params: { ...data } });
}

export async function editUser(id:any, data:any) {
  return fetchApi.put(`admin/editUser/${id}`, data);
}

export async function showUser(id:any) {
  return fetchApi.get(`admin/user/${id}`);
}

export async function showAssessmentList(data:any) {
  return fetchApi.get('admin/assessments', { params: { ...data } });
}

export async function showAssessment(id:any) {
  return fetchApi.get(`admin/assessment/${id}`);
}

export async function editAssessment(id:any, data:any) {
  return fetchApi.put(`admin/editAssessment/${id}`, data);
}

export async function showQuestionnaireList(data:any) {
  return fetchApi.get('admin/questionnaires', { params: { ...data } });
}

export async function showQuestionnaire(id:any) {
  return fetchApi.get(`admin/questionnaire/${id}`);
}

export async function editQuestionnaire(id:any, data:any) {
  return fetchApi.put(`admin/editQuestionnaire/${id}`, data);
}

export async function showOwnerList(data:any) {
  return fetchApi.get('admin/owners', { params: { ...data } });
}

export async function showOwner(id:any) {
  return fetchApi.get(`admin/owner/${id}`);
}

export async function editOwner(id:any, data:any) {
  return fetchApi.put(`admin/editOwner/${id}`, data);
}

export async function showAllOrders(data:any) {
  return fetchApi.get('admin/allOrders', { params: { ...data } });
}

export async function showOrder(id:any) {
  return fetchApi.get(`admin/showOrder/${id}`);
}

export async function createAssessment(data:any) {
  return fetchApi.post('admin/createAssessment', data);
}

export async function commands(data:any) {
  return fetchApi.post('admin/commands', data);
}

export async function updateServer(data:any) {
  return fetchApi.post('admin/updateServer', data);
}

export async function allLogs(data:any) {
  return fetchApi.get('admin/allLogs', { params: { ...data } });
}

export async function config() {
  return fetchApi.get('admin/config');
}

export async function setConfig(data:any) {
  return fetchApi.post('admin/config', data);
}

export async function loginActivities(data:any) {
  return fetchApi.get('admin/loginActivities', { params: { ...data } });
}

export async function frontVersion(data:any) {
  return fetchApi.post('admin/frontVersion', data);
}
export async function createOwner(data:any) {
  return fetchApi.post('admin/owner', data);
}

export async function importExcel(data:any) {
  return fetchApi.post('admin/importExcel', data);
}
export async function sendNotification(data:any) {
  return fetchApi.post('admin/addAnnouncement', data);
}
export async function SendSMS(data:any) {
  return fetchApi.post('admin/sms', data);
}

const exportedApi = {
  userList,
  editUser,
  showUser,
  showAssessmentList,
  showAssessment,
  editAssessment,
  showQuestionnaireList,
  showQuestionnaire,
  editQuestionnaire,
  showOwnerList,
  showOwner,
  editOwner,
  showAllOrders,
  showOrder,
  createAssessment,
  commands,
  setConfig,
  loginActivities,
  frontVersion,
  createOwner,
  updateServer,
  allLogs,
  config,
  importExcel,
  sendNotification,
  SendSMS,
};

export default exportedApi;
