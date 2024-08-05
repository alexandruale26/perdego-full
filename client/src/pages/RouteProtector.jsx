import { Outlet, Navigate } from "react-router-dom";
import useCheckAuth from "./useCheckAuth";

const RouteProtector = () => {
  const { authenticated, isLoading } = useCheckAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!authenticated) return <Navigate to="/autentificare" replace />;
  return <Outlet />;
};
RouteProtector.displayName = "RouteProtector";

export default RouteProtector;
