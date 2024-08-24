import Cookies from "js-cookie";

const setAuthCookie = () => {
  const newDate = new Date(new Date().getTime() + 10 * 1000);
  Cookies.set("isAuth", -1, { expires: newDate, path: "/" });
};

const getAuthCookie = () => {
  return Cookies.get("isAuth");
};

const deleteAuthCookie = () => {
  Cookies.remove("isAuth", { path: "/" });
};

export { setAuthCookie, getAuthCookie, deleteAuthCookie };
