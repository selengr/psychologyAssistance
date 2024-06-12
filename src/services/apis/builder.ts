import { ITest } from '@/@types/bulider';
import { fetchApi } from '../config/configAxios';

interface ITestApi {
  data: ITest[];
}
export function textApi() {
  return fetchApi.get<ITestApi>('/test');
}


// useAge 
// try {
//   await textApi
// } catch (error) {
//    console.log('sss')
// }