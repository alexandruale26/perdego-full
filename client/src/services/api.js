import axios from "axios";
import { BASE_URL } from "./config";
import { setAuthCookie, deleteAuthCookie } from "./authCookie";

const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use(
  (config) => {
    const accessToken = api.defaults.headers.common["Authorization"];
    if (accessToken) {
      config.headers.Authorization = `${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  // error object
  async ({ config, response }) => {
    const originalRequest = config;

    if (response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await requestAccessToken();
        return api(originalRequest);
      } catch {
        if (window.location.pathname !== "/autentificare") {
          console.log("automatically redirected to login");
          // window.history.replaceState(null, "", "/"); // test some restricted access routes
          // window.location.assign("/autentificare");
          window.location.href = "/autentificare";
        }
      }
    }

    return { data: generateErrorResponseData(response) };
  },
);

const requestAccessToken = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/users/refresh-token`, null, {
      withCredentials: true,
    });

    if (response.data.status === "success") {
      const { accessToken } = response.data;
      setAuthCookie();
      setApiAccessToken(accessToken);

      console.log("new access token generated");
      return { status: "success" };
    }
  } catch (error) {
    console.log(error);
    // deleteAuthCookie e bun. Daca userul inca e autentificat "isAuth" dar in DB refreshToken
    // nu mai exista atunci (cand face alt request decat login) nu ii mai oferi acces la aplicatie
    deleteAuthCookie();

    throw new Error(error);
  }
};

const setApiAccessToken = (accessToken) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
};

const generateErrorResponseData = (response) => {
  const isClientError = `${response.status}`.startsWith("4");
  const status = isClientError ? "fail" : "error";
  const message = isClientError
    ? response.data.message
    : "Something went very wrong!";

  return { status, message };
};

export { api, setApiAccessToken, requestAccessToken };
