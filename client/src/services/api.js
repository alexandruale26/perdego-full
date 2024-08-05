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
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await requestAccessToken();
        return api(originalRequest);
      } catch (err) {
        console.log("Refresh token error:", err);
        if (window.location.pathname !== "/autentificare") {
          console.log("automatically redirected to login");
          window.history.replaceState(null, "", "/autentificare"); // test some restricted access routes
          window.location.assign("/autentificare");
        }
      }
    }
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
    deleteAuthCookie();

    throw new Error(error);
  }
};

const setApiAccessToken = (accessToken) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
};

export { api, setApiAccessToken, requestAccessToken };
