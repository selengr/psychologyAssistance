// import http from 'api/config/apiConfig';
import { fetchApi } from '../config/configAxios';

export async function showReport(data) {
  return fetchApi.post(`test/result`, data);
}

export async function getQuestions(t_id, q_id) {
  return fetchApi.get(`test/showQuestions/?test_id=${t_id}&questionnaire_id=${q_id}`);
}

export async function getTaskItem(t_id, q_id) {
  return fetchApi.get(`task/showQuestions/?test_id=${t_id}&questionnaire_id=${q_id}`);
}

export async function submitTestAnswer(data) {
  return fetchApi.post(`test/answers`, data);
}

export async function submitTaskAnswer(data) {
  return fetchApi.post(`task/answers`, data);
}

export async function userTest(ownerId) {
  return fetchApi.get(`test/userTests?owner_id=${ownerId}`);
}

export async function getTestInfo(id) {
  return fetchApi.get(`test/showOne/${id}`);
}

const exportedApi = {
  userTest,
  getTestInfo,
  showReport,
  submitTestAnswer,
  submitTaskAnswer,
  getQuestions,
  getTaskItem,
};

export default exportedApi;
