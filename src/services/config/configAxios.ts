import { toast } from 'sonner';
import { BASE_URL_API } from 'config-global';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getToken, handelErrorsApi, removeToken } from '@/helpers';

interface IApiError {
  status: number;
  message: string;
  errors?: { [key: string]: string[] };
}

interface ApiResponse<T = any> {
  data: T;
  message?: string;
}

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL_API,
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    if (!!response?.data?.message) {
      toast.success(response.data.message);
    }
    return response;
  },
  (error) => {
    console.error(error);
    if (error.response?.status === 401) {
      removeToken();
      history.pushState({}, '', '/auth');
      setTimeout(() => {
        window.location.href = '/auth';
      }, 3000);
    }
    if (error.response?.status < 500) {
      handelErrorsApi(error.response.data.error ?? error.response.data.errors);
    } else {
      toast.error('درخواست شما با خطا مواجه شده است مجددا تلاش کنید', {
        duration: 3500,
      });
    }

    const apiError: IApiError = {
      status: error.response?.status || 500,
      message: error.message || 'Unknown error',
      errors: error.response?.data.error,
    };

    return Promise.reject(apiError);
  }
);

export const callApi = api;
