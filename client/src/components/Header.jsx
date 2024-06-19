import { Link } from "react-router-dom";
import Button from "./ui/button";
import { UserRound } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 w-full flex justify-between items-center bg-white pl-9 pr-10 py-1 shadow-[0_2px_10px_1px_rgba(0,0,0,0.1)] z-10">
      <Link to="/">
        <img src="logo.png" alt="logo" className="w-[253px] h-[60px]" />
      </Link>
      <nav className="flex items-center gap-10">
        {/* <Button variant="iconText" size="iconText">
          <UserRound />
          <span className="text-black">Contul tǎu</span>
        </Button> */}
        <Button asChild variant="iconText" size="iconText">
          <Link to="/login">
            <UserRound />
            <span className="text-black">Contul tǎu</span>
          </Link>
        </Button>
        <Button asChild>
          <Link to="/administrare">Adaugǎ anunț nou</Link>
        </Button>
      </nav>
    </header>
  );
};

export default Header;
