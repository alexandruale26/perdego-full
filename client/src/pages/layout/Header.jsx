import { Link as RouterLink } from "react-router-dom";
import Link from "../../components/Link";
import Button from "../../components/ui/Button";
import { PencilLine, Search, UserRound } from "lucide-react";
import { api } from "../../services/api.js";

const ghostButtonAttributes = {
  asChild: true,
  variant: "ghost",
  size: "iconText",
  className: "h-12",
};

const Header = () => {
  // TODO: de sters
  const getMe = async () => {
    const { data } = await api.get("/users/profile");

    if (data.status === "success") {
      console.log(data.data);
    }
  };

  // TODO: make logo a shared component
  return (
    <header className="sticky top-0 w-full flex justify-between items-center bg-white pl-7 pr-10 py-1 shadow-[0_2px_10px_1px_rgba(0,0,0,0.1)] z-10">
      <Link to="/">
        <img
          src="/logo.png"
          alt="perdego logo"
          className="w-[253px] h-[60px]"
        />
      </Link>
      <nav className="flex items-center gap-5">
        {/* <Button type="button" onClick={getMe}>
          Get me
        </Button> */}
        <Button {...ghostButtonAttributes}>
          <RouterLink to="/anunturi">
            <Search />
            <span>Cautǎ în anunțuri</span>
          </RouterLink>
        </Button>

        <Button {...ghostButtonAttributes}>
          <RouterLink to="/autentificare">
            <UserRound />
            <span>Contul tǎu</span>
          </RouterLink>
        </Button>

        <Button asChild className="h-12 gap-3 px-4">
          <RouterLink to="/anunturi/nou">
            <PencilLine />
            Adaugǎ anunț nou
          </RouterLink>
        </Button>
      </nav>
    </header>
  );
};
Header.displayName = "Header";

export default Header;
