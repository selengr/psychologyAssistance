import { callApi } from '../config/configAxios';
import { formSchemaType } from '@/formBuilder/schemas/form';

interface ITestApi {
  data: any;
}

export type IChangeOrMovePositionApi = {
  formBuilderId: number;
  questionId: number;
  questionGroupId: number;
  targetQuestionGroupId: number | null;
  newPosition: number;
};

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
  return callApi.put<any>('/question/' + id, finalFieldData);
}

export function callApiQuestionNewPosition(finalFieldData: any) {
  return callApi.post<any>('/question/change-position-or-move', finalFieldData);
}

export function callApiCreateNewQuestionGroup(finalFieldData: any) {
  return callApi.post<any>('/question-group', finalFieldData);
}

export function callApiDeleteQuestion(id: number) {
  return callApi.delete<any>('/question/' + id);
}

export function callApiDuplicateQuestion(id: number) {
  return callApi.post<any>(`/question/${id}/duplicate`);
}
