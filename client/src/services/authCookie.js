const setAuthCookie = () => {
  document.cookie = `isAuth=-1;max-age=${15 * 60};path=/`;
};

const getAuthCookie = () => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; isAuth=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

const deleteAuthCookie = () => {
  document.cookie = "isAuth=;max-age=0;path=/";
};

export { setAuthCookie, getAuthCookie, deleteAuthCookie };
