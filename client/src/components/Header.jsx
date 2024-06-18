import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { UserRound } from "lucide-react";

const Header = () => {
  return (
    <header className="flex justify-between items-center ml-8 mr-9 my-1 z-10">
      <img src="logo.png" alt="logo" className="w-[253px] h-[60px]" />
      <nav className="flex items-center gap-8">
        <div className="h-12 flex items-center gap-1.5 text-sm font-semibold">
          <UserRound className="text-primary" />
          Contul tǎu
        </div>
        <Button asChild>
          <Link to="/administrare">Adaugǎ anunț nou</Link>
        </Button>
      </nav>
    </header>
  );
};

export default Header;
