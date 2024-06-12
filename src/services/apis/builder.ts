import { ITest } from '@/@types/bulider';
import { fetchApi } from '../config/configAxios';
import { formSchemaType } from '@/formBuilder/schemas/form';

interface ITestApi {
  data: any;
}

export function textApi() {
  return fetchApi.get<ITestApi>('/test');
}


export function callApiForm(id:string) {
  return fetchApi.get<ITestApi>('/form/' + id)
}

export function callApiCreateForm(values: formSchemaType) {
  return fetchApi.post<any>('/form',values)
}


export function callApiQuestionCreate(finalFieldData: any) {
  return fetchApi.post<any>('/question',finalFieldData)
}


export function callApiQuestionUpdate(id:number,finalFieldData: any) {
  return fetchApi.put<any>('/question'+id,finalFieldData)
}

  