import Button from "./ui/button";
import { Link } from "react-router-dom";

const PerdegoTip = () => {
  return (
    <div className="w-full max-h-[250px] flex items-center justify-between gap-8 bg-grey-6 rounded-lg pl-10 pr-6 mt-6 overflow-hidden shadow-lg">
      <div className="max-w-[40%] flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-primary leading-none -mt-1">
          Sfatul PERDEGO
        </h2>
        <p className="tracking-wide leading-relaxed">
          Dacă adaugi poză anunțului tău, ai șanse mai mari de a găsi obiectul
          pierdut sau proprietarul.
        </p>
        <Button asChild variant="cta" size="cta" className="w-fit mt-1">
          <Link to="/anunturi/nou">Adaugǎ anunț</Link>
        </Button>
      </div>
      <img
        src="/graph_found.svg"
        alt="perdego banner"
        className="max-w-[60%] object-contain"
      />
    </div>
  );
};

export default PerdegoTip;
