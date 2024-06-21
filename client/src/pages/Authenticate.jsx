import { Link, Outlet } from "react-router-dom";
import { MoveLeft } from "lucide-react";
import Button from "../components/ui/button";

const Authenticate = () => {
  return (
    <main className="min-w-full min-h-screen relative flex items-center bg-primary bg-authenticate bg-no-repeat bg-center bg-cover">
      <div className="absolute right-0 -translate-x-1/4">
        <div className="w-[520px] h-[760px] relative flex flex-col justify-between bg-white/95 px-12 pt-12 rounded-lg">
          <Outlet />

          <span className="text-sm text-center mb-10">
            Intrând în cont, accepți{" "}
            <strong className="font-semibold hover:border-b-2 hover:border-secondary transition-colors">
              <Link to="/termeni-si-conditii">Termenii și Condițiile</Link>
            </strong>{" "}
            site-ului nostru.
          </span>

          <Button
            asChild
            variant="link"
            size="link"
            className="absolute top-3 left-3"
            tabIndex={1}
          >
            <Link to="/">
              <MoveLeft />
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
};
Authenticate.displayName = "Authenticate";

export default Authenticate;
