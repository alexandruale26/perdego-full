import { Outlet, Navigate, useLocation } from "react-router-dom";
import { getAuthToken } from "../utils/authCookie";

const RouteProtector = () => {
  const isAuth = getAuthToken();
  const location = useLocation();

  if (!isAuth)
    return (
      // TODO: check if need search params here
      <Navigate to={`/autentificare?redirect=${location.pathname}`} replace />
    );
  return <Outlet />;
};
RouteProtector.displayName = "RouteProtector";

export default RouteProtector;
