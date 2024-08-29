import Cookies from "js-cookie";

const authToken = "isAuth";

const setAuthToken = (expiresAfterDays) => {
  Cookies.set(authToken, -1, { expires: expiresAfterDays, path: "/" });
};

const getAuthToken = () => {
  return Cookies.get(authToken);
};

const deleteAuthToken = () => {
  Cookies.remove(authToken, { path: "/" });
};

export { setAuthToken, getAuthToken, deleteAuthToken };
