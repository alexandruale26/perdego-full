import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

// TODO: verifica mai bine codul de 404
// TODO: spinner la continut in paginile din layout cand nu cere token nou + ProtectedRoute
// TODO: loading indicator la Homepage
// TODO: skeletons la PostPage si Anunturi
const NotFoundPage = () => {
  return (
    <main className="h-screen flex flex-col items-center justify-center gap-4 md:gap-6 p-5 text-center mx-auto">
      <div className="flex flex-col items-center gap-1">
        <div className="flex">
          <span className="text-7xl md:text-9xl translate-x-2 md:translate-x-4">
            4
          </span>
          <img
            src="/404-cry-face.svg"
            alt="sad face emoji"
            className="max-w-16 md:max-w-28"
          />
          <span className="text-7xl md:text-9xl -translate-x-2 md:-translate-x-4">
            4
          </span>
        </div>

        <h1 className="text-base md:text-lg font-semibold">
          Pagina cǎutatǎ nu poate fi gǎsitǎ
        </h1>
      </div>

      <div className="max-w-[350px] md:max-w-[420px] flex flex-col items-center gap-4">
        <p className="text-sm md:text-base text-grey-3">
          Ne pare rǎu, dar pagina pe care o cauți nu existǎ, a fost înlǎturatǎ
          sau nu este disponibilǎ momentan.
        </p>

        <Button
          variant="cta"
          className="h-12 md:h-14 px-6 md:px-8 rounded-full"
          asChild
        >
          <Link to="/" replace>
            Mergi pe pagina principalǎ
          </Link>
        </Button>
      </div>
    </main>
  );
};

export default NotFoundPage;
