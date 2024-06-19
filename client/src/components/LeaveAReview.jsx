import { Link } from "react-router-dom";
import Button from "./ui/button";

const LeaveAReview = () => {
  return (
    <div className="w-full flex items-center justify-between gap-6 bg-grey-6 rounded-lg px-10 py-6 shadow-lg">
      <div className="flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-primary leading-none">
          Ți-ai recuperat un obiect pierdut cu ajutorul nostru?
        </h2>
        <p className="tracking-wide leading-relaxed">
          Spune-ne părerea ta despre experiența cu PERDEGO
        </p>
      </div>
      <Button asChild variant="cta" size="cta">
        <Link to="/recenzii/nou">Lasǎ o recenzie</Link>
      </Button>
    </div>
  );
};

export default LeaveAReview;
