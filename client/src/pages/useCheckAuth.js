import { useState, useEffect } from "react";
import { requestAccessToken } from "../services/api";
import { getAuthCookie } from "../utils/authCookie";

const useCheckAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // TODO: implement here Tanstack Query
  // da ,aici trebuie implementat mai intai
  // always stale data

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = getAuthCookie();
      if (isAuth === "-1") {
        return setTimeout(() => {
          setAuthenticated(true);
          setIsLoading(false);
        }, 800);
      }

      try {
        const response = await requestAccessToken();

        if (response.status === "success") {
          setTimeout(() => {
            setAuthenticated(true);
            setIsLoading(false);
          }, 800);
        }
      } catch {
        // TODO: when it will get in catch??
        console.log("useCheckAuth is in catch -> why??");
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { authenticated, isLoading };
};

export default useCheckAuth;
