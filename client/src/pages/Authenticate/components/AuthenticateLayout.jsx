import { Link, Outlet, Navigate } from "react-router-dom";
import { MoveLeft } from "lucide-react";
import Button from "../../../components/ui/Button";
import useCheckAuth from "../../useCheckAuth";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "../../../components/ui/Tooltip";

// TODO: don't make it absolute. will overflow if taller than screen height
const AuthenticateLayout = () => {
  const { authenticated, isLoading } = useCheckAuth();

  if (isLoading) return <div>Loading...</div>;
  if (authenticated) return <Navigate to="/" replace />;

  return (
    <main className="min-w-full min-h-screen flex items-center bg-primary bg-authenticate bg-no-repeat bg-center bg-cover">
      <div className="absolute right-0 -translate-x-1/4">
        <div className="w-[520px] h-[650px] flex flex-col justify-between bg-white bg-opacity-98 px-12 pt-12 rounded-lg">
          <Outlet />

          <span className="text-sm text-center mb-10">
            Intrând în cont, accepți{" "}
            <strong className="font-semibold hover:border-b-2 hover:border-secondary transition-colors">
              <Link to="/termeni-si-conditii">Termenii și Condițiile</Link>
            </strong>
            site-ului nostru.
          </span>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  asChild
                  variant="icon"
                  size="icon"
                  className="absolute top-2 left-2 text-black"
                  tabIndex={1}
                >
                  <Link to="/">
                    <MoveLeft />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Pagina principalǎ</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </main>
  );
};
AuthenticateLayout.displayName = "AuthenticateLayout";

export default AuthenticateLayout;
