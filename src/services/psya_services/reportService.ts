// import http from 'api/config/apiConfig';

import { fetchApi } from "../config/configAxios";

export async function reportList(data) {
  return fetchApi.get('assessment/users', {
    params: { ...data },
  });
}

export async function usersByQuestionnaire(data) {
  return fetchApi.get('assessment/usersByQuestionnaire', {
    params: { ...data },
  });
}

const exportedApi = {
  reportList,
  usersByQuestionnaire,
};

export default exportedApi;
