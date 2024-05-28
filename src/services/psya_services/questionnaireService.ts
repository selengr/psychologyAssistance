// import http from 'api/config/apiConfig';

import { fetchApi } from "../config/configAxios";

export async function getQuestionnairesList(data) {
  return fetchApi.get(`questionnaire`, { params: { ...data } });
}

export async function getOneQuestionnaire(id) {
  return fetchApi.get(`questionnaire/${id}`);
}

const exportedApi = {
  getQuestionnairesList,
  getOneQuestionnaire,
};

export default exportedApi;
