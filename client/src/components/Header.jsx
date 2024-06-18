import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./ui/button";
import { UserRound, Search } from "lucide-react";
import * as Input from "./ui/input";

const Header = () => {
  const [showSearch, setShowSearch] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <header className="flex justify-between items-center ml-8 mr-9 my-1 z-10">
      <img src="logo.png" alt="logo" className="w-[253px] h-[60px]" />
      <nav className="flex items-center gap-10">
        <form onSubmit={handleSubmit} className="flex">
          {showSearch && (
            <Input.Root>
              <Input.Field variant="search" />
              <Input.Clear />
            </Input.Root>
          )}
          <Button variant="iconText" size="iconText">
            <Search />
            <span className="text-black">Cautǎ</span>
          </Button>
        </form>

        <Button variant="iconText" size="iconText">
          <UserRound />
          <span className="text-black">Contul tǎu</span>
        </Button>
        <Button asChild>
          <Link to="/administrare">Adaugǎ anunț nou</Link>
        </Button>
      </nav>
    </header>
  );
};

export default Header;
