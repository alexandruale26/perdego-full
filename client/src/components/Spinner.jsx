import PropTypes from "prop-types";
import { cn } from "../utils/cn";
import { cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";

const spinnerVariants = cva("h-full items-center justify-center", {
  variants: {
    show: {
      true: "flex",
      false: "hidden",
    },
  },
  defaultVariants: {
    show: true,
  },
});

const loaderVariants = cva("animate-spin text-primary", {
  variants: {
    size: {
      small: "size-6",
      medium: "size-8",
      large: "size-12",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

const Spinner = ({ size, show = true, className }) => {
  return (
    <span className={spinnerVariants({ show })}>
      <Loader2 className={cn(loaderVariants({ size }), className)} />
    </span>
  );
};
Spinner.displayName = "Spinner";
Spinner.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  show: PropTypes.bool,
  className: PropTypes.string,
};

export default Spinner;
