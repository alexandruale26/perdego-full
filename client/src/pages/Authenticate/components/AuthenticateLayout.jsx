import { Outlet, Navigate } from "react-router-dom";
import { getAuthToken } from "../../../utils/authCookie";
import Link from "../../../components/Link";

// TODO: don't make it absolute. will overflow if taller than screen height
const AuthenticateLayout = () => {
  const isAuth = getAuthToken();

  if (isAuth) return <Navigate to="/" replace />;

  return (
    <main className="min-w-full min-h-screen flex items-center bg-primary bg-authenticate bg-no-repeat bg-center bg-cover">
      <div className="absolute right-0 -translate-x-1/4">
        <div className="w-[520px] h-[600px] flex flex-col justify-between bg-white bg-opacity-98 px-12 pt-20 rounded-lg">
          <Link to="/" hasArrow className="absolute top-6 left-6 text-xl">
            Acasǎ
          </Link>
          <Outlet />

          <span className="text-sm text-center mb-10">
            Accesând contul, accepți{" "}
            <Link
              to="/termeni-si-conditii"
              className="inline text-sm font-bold px-0.5 py-0.5"
            >
              Termenii și Condițiile
            </Link>{" "}
            site-ului nostru.
          </span>
        </div>
      </div>
    </main>
  );
};
AuthenticateLayout.displayName = "AuthenticateLayout";

export default AuthenticateLayout;
