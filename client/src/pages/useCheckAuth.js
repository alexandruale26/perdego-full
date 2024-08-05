import { useState, useEffect } from "react";
import { requestAccessToken } from "../services/api";
import {
  getAuthCookie,
  setAuthCookie,
  deleteAuthCookie,
} from "../services/authCookie";

const useCheckAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = getAuthCookie();
      if (isAuth === "-1") {
        setAuthenticated(true);
        return setIsLoading(false);
      }

      try {
        const response = await requestAccessToken();
        console.log("authenticated from server refresh token");

        if (response.status === "success") {
          setAuthenticated(true);
          setAuthCookie();
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        deleteAuthCookie();
        setAuthenticated(false);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { authenticated, isLoading };
};

export default useCheckAuth;
