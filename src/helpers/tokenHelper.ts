import Cookies from 'js-cookie';
// import { TOKEN_KEY } from 'rootApp/core/enum/enumGlobal';
// enum TOKEN_KEY "token" 

export const setToken = (token: string) => {
  Cookies.set("token", token);
};

export const getToken = () => Cookies.get("token");

export const removeToken = () => {
  if (!!window) {
    Cookies.remove("token");
  }
};
