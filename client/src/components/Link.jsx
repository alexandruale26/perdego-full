import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import { MoveLeft } from "lucide-react";
import { cn } from "../utils/cn";

// TODO: add state to Link when user access a post to check if can go back in app
// TODO: pune manual in fiecare pagina catre ce redirectioneaza -> asae cel mai corect
// TODO: verifica si daca link-ul redirectioneaza corect la hover jos stanga

const Link = ({ to, hasArrow = false, children, className, ...props }) => {
  return (
    <RouterLink
      to={to ?? -1}
      className={cn(
        "w-fit flex items-center gap-2 text-xl px-1 underline focus-visible:outline-secondary",
        className,
      )}
      {...props}
    >
      {hasArrow ? <MoveLeft /> : null} <span>{children}</span>
    </RouterLink>
  );
};
Link.displayName = "Link";
Link.propTypes = {
  className: PropTypes.string,
  hasArrow: PropTypes.bool,
  children: PropTypes.node,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Link;
