import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
});

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

      // TODO: separate the login function into a separate  axios instance/api, to avoid trying fetching new access token

      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/users/refresh-token",
          null,
          {
            withCredentials: true,
          },
        );

        const { accessToken } = response.data;

        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch (err) {
        console.error("Refresh token error:", err);
        if (window.location.pathname !== "/autentificare")
          window.location.href = "/autentificare";
      }
    }
    console.error("Request failed:", error);
    return Promise.reject(error);
  },
);

export default api;
