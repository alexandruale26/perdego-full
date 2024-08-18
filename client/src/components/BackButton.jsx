import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { MoveLeft } from "lucide-react";

const BackButton = () => {
  return (
    <Link className="w-fit flex items-center gap-3 text-lg underline">
      <MoveLeft /> <span>Înapoi</span>
    </Link>
  );
};
BackButton.displayName = "BackButton";

export default BackButton;
