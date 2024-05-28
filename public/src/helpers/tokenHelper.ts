import Cookies from 'js-cookie';
import { TOKEN_KEY } from 'rootApp/core/enum/enumGlobal';

export const setToken = (token: string) => {
  Cookies.set(TOKEN_KEY, token);
};

export const getToken = () => Cookies.get(TOKEN_KEY);

export const removeToken = () => {
  if (!!window) {
    Cookies.remove(TOKEN_KEY);
  }
};
