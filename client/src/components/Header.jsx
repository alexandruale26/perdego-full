import { Link } from "react-router-dom";
import Button from "./ui/Button";
import { UserRound } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 w-full flex justify-between items-center bg-white pl-9 pr-10 py-1 shadow-[0_2px_10px_1px_rgba(0,0,0,0.1)] z-10">
      <Link to="/">
        <img src="/logo.png" alt="logo" className="w-[253px] h-[60px]" />
      </Link>
      <nav className="flex items-center gap-10">
        <Button asChild variant="iconText" size="iconText">
          <Link to="/autentificare">
            <UserRound />
            <span className="text-black">Contul tǎu</span>
          </Link>
        </Button>
        <Button asChild className="h-12">
          <Link to="/anunturi/nou">Adaugǎ anunț nou</Link>
        </Button>
      </nav>
    </header>
  );
};
Header.displayName = "Header";

export default Header;
