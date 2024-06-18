import { ITest } from '@/@types/bulider';
import { callApi } from '../config/configAxios';
import { formSchemaType } from '@/formBuilder/schemas/form';

interface ITestApi {
  data: any;
}

export function textApi() {
  return callApi.get<ITestApi>('/test');
}

export function callApiForm(id: string) {
  return callApi.get<any>('/form/' + id);
}

export function callApiCreateForm(values: formSchemaType) {
  return callApi.post<any>('/form', values);
}

export function callApiQuestionCreate(finalFieldData: any) {
  return callApi.post<any>('/question', finalFieldData);
}

export function callApiQuestionUpdate(id: number, finalFieldData: any) {
  return callApi.put<any>('/question' + id, finalFieldData);
}
