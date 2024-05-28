import axios, {
  AxiosError,
  AxiosResponse,
  AxiosInstance,
  InternalAxiosRequestConfig
} from 'axios';
import { toast } from 'sonner';


// config
import { AUTH0_API } from 'config-global';


/**
 * Make request to IG API
 * @param baseURL
 * @param url
 * @param agent
 * @param options
 */

interface ApiResponse<T> {
  data: T;
}

// ----------------------------------------------------------------------

const AUTH_TOKEN = 'your_auth_token';

const callApi = (baseURL?: string, data?: unknown) => {
  const axiosInstance = axios.create({
    baseURL: baseURL || AUTH0_API.domain,
    timeout: 12000,
    headers: {
      Accept: 'application/json'
      //  config.headers['Authorization'] = 'Bearer ' + getToken();
      //  Authorization: 'Bearer YOUR_TOKEN' // AUTH_TOKEN
    },
    // transformRequest: [
    //   (data) => {
    //     return JSON.stringify(data
    //   },
    // ],
    transformResponse: [
      (data) => {
        return JSON.parse(data);
      }
    ]
  });

  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // if ("token") {
      return config;
    },
    (error: AxiosError | Error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      //  handle successful responses here
      return response.data;
    },

    (error: AxiosError) => {
      const { message, name, response, request, status } = error;
      const res = error?.response;

      // Handle different types of errors such as (network, server, etc.)
      if (response) {
        console.error('Server Error:', response.status, response.data);

        switch (status) {
          case 401: {
            // "Login required"
            // Delete Token & Go To Login Page if you required.
            // sessionStorage.removeItem("token")
            toast.error('Unauthorized');
            //redirect to login soon will happend  PATH_AUTH
            break;
          }
          case 403: {
            // "Permission denied"
            toast.error('Forbidden');
            break;
          }
          case 404: {
            // "Invalid request"
            toast.error('Not found');
            break;
          }
          case 500: {
            // "Server error"
            toast.error('Internal server error');
            break;
          }
          default: {
            // "Unknown error occurred"
            toast.error('An unknown error occurred');
            break;
          }
        }
      } else if (request) {
        // Handle network errors
        console.error('Network Error:', message);
        toast.error('Network error');
      } else {
        // Handle other errors
        console.error('Error:', message);
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default callApi;

//=============================================
//
//  ##   ##   ####    ###     ####    #####
//  ##   ##  ##      ## ##   ##       ##
//  ##   ##   ###   ##   ##  ##  ###  #####
//  ##   ##     ##  #######  ##   ##  ##
//   #####   ####   ##   ##   ####    #####
//
//=============================================

// POST
// const data = {
//   name: 'John Doe',
//   email: 'john.doe@example.com',
// };

// const response = await callApi().post('/users', data);

// GET
// const response = await callApi().get('/users');

// PUT
// const data = {
//   name: 'Jane Doe',
// };

// const response = await callApi().put('/users/123', data);
