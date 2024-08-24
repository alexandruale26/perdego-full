import { Outlet, Navigate, useLocation } from "react-router-dom";
import useCheckAuth from "./useCheckAuth";

const RouteProtector = () => {
  // ! instant loading if isAuth exists in token, else will show Loading...
  // ! show a loading indicator thats absolute then redirect to Outlet if isAuth

  // !! se repeta in mai multe locuri. poate o componenta care se ocupa de asta
  const { authenticated, isLoading } = useCheckAuth();
  const location = useLocation();

  if (isLoading) return <div>Loading...</div>;
  if (!authenticated)
    return (
      <Navigate to={`/autentificare?redirect=${location.pathname}`} replace />
    );
  return <Outlet />;
};
RouteProtector.displayName = "RouteProtector";

export default RouteProtector;
