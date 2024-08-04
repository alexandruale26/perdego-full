import axios from "axios";
import { BASE_URL } from "./config";

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
        console.error("Refresh token error:", err);
        if (window.location.pathname !== "/autentificare")
          window.location.href = "/autentificare";
      }
    }
    console.error("Request failed - BAD:", error); // maybe redirect to login if code gets here
    return Promise.reject(error);
  },
);

const requestAccessToken = async () => {
  const response = await axios.post(`${BASE_URL}/users/refresh-token`, null, {
    withCredentials: true,
  });

  const { accessToken } = response.data;
  setApiAccessToken(accessToken);
};

const setApiAccessToken = (accessToken) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
};

export { api, setApiAccessToken };
