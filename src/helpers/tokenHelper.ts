import Cookies from 'js-cookie';
export const TOKEN_KEY = 'token';

export const setToken = (token: string) => {
  Cookies.set(TOKEN_KEY, token);
};

export const getToken = () => Cookies.get(TOKEN_KEY);

export const removeToken = () => {
  if (!!window) {
    Cookies.remove(TOKEN_KEY);
  }
};
