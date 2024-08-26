import { Outlet, Navigate, useLocation } from "react-router-dom";
import useCheckAuth from "./useCheckAuth";
import PageLoader from "../components/PageLoader";

const RouteProtector = () => {
  // !! se repeta in mai multe locuri. poate o componenta care se ocupa de asta
  const { authenticated, isLoading } = useCheckAuth();
  const location = useLocation();

  if (isLoading) return <PageLoader />;
  if (!authenticated)
    return (
      <Navigate to={`/autentificare?redirect=${location.pathname}`} replace />
    );
  return <Outlet />;
};
RouteProtector.displayName = "RouteProtector";

export default RouteProtector;

// TODO: React Query + loading indicator global/specific -> testat
