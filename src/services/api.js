import axios from "axios";
import {HttpCode} from "../utils/constants";

const BACKEND_URL = `https://6.react.pages.academy/six-cities`;
const REQUEST_TIMEOUT = 5000;

export const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    const {response} = err;

    if (response.status === HttpCode.UNAUTHORIZED) {
      onUnauthorized();

      // Бросаем ошибку, потому что нам важно прервать цепочку промисов после запроса авторизации.
      // Запрос авторизации — это особый случай и важно дать понять приложению, что запрос был неудачным.
      throw err;
    }
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

// createAPI - возвращает настроенный объект axios
// withCredentials - указывает, нужно ли использовать куки. В случае этого проекта,
//    авторизация построена на куках, поэтому ключ true
// api.interceptors - перехватывают коллбэки и перенаправляют выполнение на onSuccess или на onFail. Объяснение:
//    в случае с fetch, при возникновении, к примеру, 401, выводится ошибка,
//    axios же позволяет обработать эту ошибку. Т.о. в случае успеха, вызывается onSuccess,
//    извлекается response и перекидывается далее на выполнение. В случае onFail, можно самостоятельно
//    выбрать стратегию действий. В данном проекте мы вызываем коллбэк onUnauthorized, который передаётся
//    в конструктор createAPI впоследстции данный коллбэк будет редиректить пользователя на страницу авторизации
