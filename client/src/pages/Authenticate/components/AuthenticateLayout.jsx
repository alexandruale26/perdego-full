import { Link, Outlet, Navigate } from "react-router-dom";
import useCheckAuth from "../../useCheckAuth";
import BackButton from "../../../components/BackButton";

// TODO: don't make it absolute. will overflow if taller than screen height
const AuthenticateLayout = () => {
  const { authenticated, isLoading } = useCheckAuth();

  if (isLoading) return <div>Loading...</div>;
  if (authenticated) return <Navigate to="/" replace />;

  return (
    <main className="min-w-full min-h-screen flex items-center bg-primary bg-authenticate bg-no-repeat bg-center bg-cover">
      <div className="absolute right-0 -translate-x-1/4">
        <div className="w-[520px] h-[650px] flex flex-col justify-between bg-white bg-opacity-98 px-12 pt-20 rounded-lg">
          <BackButton
            to="/"
            name="Acasǎ"
            className="absolute top-6 left-6 text-xl"
          />
          <Outlet />

          <span className="text-sm text-center mb-10">
            Intrând în cont, accepți{" "}
            <strong className="font-semibold hover:border-b-2 hover:border-secondary transition-colors">
              <Link to="/termeni-si-conditii">Termenii și Condițiile</Link>
            </strong>
            site-ului nostru.
          </span>
        </div>
      </div>
    </main>
  );
};
AuthenticateLayout.displayName = "AuthenticateLayout";

export default AuthenticateLayout;
