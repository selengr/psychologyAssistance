// import http from 'api/config/apiConfig';
import { fetchApi } from '../config/configAxios';

// const qs = require('qs');

export async function edit(id:any, data:any) {
  return fetchApi.put(`assessment/${id}`, data);
}

export async function store(data:any) {
  return fetchApi.post('assessment', data);
}

export async function getSystemsAssessment(data:any) {
  return fetchApi.get(`assessment/systemsAssessmentsList`, { params: { ...data } });
}

export async function showAssessmentList(data:any) {
  return fetchApi.get('assessment', { params: { ...data } });
}

export async function remove(id:any) {
  return fetchApi.delete(`assessment/${id}`);
}

export async function activation(id:any, data:any) {
  return fetchApi.put(`assessment/activation/${id}`, data);
}

export async function showOneAssessment(id:any) {
  return fetchApi.get(`assessment/${id}`);
}

export async function assessmentUsers(data:any) {
  return fetchApi.get(`assessment/users`, { params: { ...data } });
}

export async function finishedUsers(ownerId, assessmentId, minDate, maxDate, order, page, perPage, groups, sort) {
  return fetchApi.get(
    `assessment/finishedUsers?owner_id=${ownerId}&assessment_id=${assessmentId}&min_date=${minDate}&max_date=${maxDate}&sex&sort_by=${sort}&order=${order}&page=${page}&per_page=${perPage}&groups[0]=${groups}`,
  );
}

export async function addToAssessments(data:any) {
  return fetchApi.post('assessment/addToMyAssessments', data);
}

export async function orderAssessment(data:any) {
  return fetchApi.post('assessment/order', data);
}

export async function getPackages(data:any) {
  return fetchApi.get(`assessment/packages`, { params: { ...data } });
}

export async function getPackageInfo(id:any) {
  return fetchApi.get(`assessment/showOnePackage/${id}`);
}

const exportedApi = {
  edit,
  store,
  getSystemsAssessment,
  showAssessmentList,
  remove,
  activation,
  showOneAssessment,
  assessmentUsers,
  addToAssessments,
  finishedUsers,
  orderAssessment,
  getPackages,
  getPackageInfo,
};

export default exportedApi;
