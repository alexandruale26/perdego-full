import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { MoveLeft } from "lucide-react";
import { cn } from "../utils/cn";

// TODO: add state to Link when user access a post to check if can go back in app
// TODO: pune manual in fiecare pagina catre ce redirectioneaza -> asae cel mai corect
// TODO: verifica si daca link-ul redirectioneaza corect la hover jos stanga

// TODO: if make sense to keep props
const BackButton = ({ to, name, className }) => {
  return (
    <Link
      to={to ?? -1}
      className={cn(
        "w-fit flex items-center gap-3 text-xl underline",
        className,
      )}
    >
      <MoveLeft /> <span>{name ?? "Înapoi"}</span>
    </Link>
  );
};
BackButton.displayName = "BackButton";
BackButton.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default BackButton;
