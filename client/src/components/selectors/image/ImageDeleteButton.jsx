import { forwardRef } from "react";
import PropTypes from "prop-types";
import { Trash2 } from "lucide-react";
import Button from "../../ui/Button";
import { cn } from "../../../lib/utils";

const ImageDeleteButton = forwardRef(
  ({ show = false, className, children, ...props }, ref) => {
    if (!show) return null;

    return (
      <Button
        variant="destructive"
        ref={ref}
        type="button"
        className={cn("w-full flex gap-2 items-center", className)}
        {...props}
      >
        <Trash2 />
        <span>{children}</span>
      </Button>
    );
  },
);
ImageDeleteButton.displayName = "ImageDeleteButton";
ImageDeleteButton.propTypes = {
  show: PropTypes.bool.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default ImageDeleteButton;
