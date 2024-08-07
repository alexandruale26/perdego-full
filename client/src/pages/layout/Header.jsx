import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import { UserRound } from "lucide-react";
import { api } from "../../services/api.js";

const Header = () => {
  const getMe = async () => {
    const response = await api.get("/users/profile");

    if (response?.data.data) {
      console.log(response.data.data);
    }
  };

  return (
    <header className="sticky top-0 w-full flex justify-between items-center bg-white pl-9 pr-10 py-1 shadow-[0_2px_10px_1px_rgba(0,0,0,0.1)] z-10">
      <Link to="/">
        <img src="/logo.png" alt="logo" className="w-[253px] h-[60px]" />
      </Link>
      <nav className="flex items-center gap-10">
        <Button type="button" onClick={getMe}>
          Get me
        </Button>
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
