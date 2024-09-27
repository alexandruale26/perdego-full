import { forwardRef } from "react";
import PropTypes from "prop-types";
import { Trash2 } from "lucide-react";
import Button from "../../ui/Button";
import { cn } from "../../../utils/cn";

const RemoveImageButton = forwardRef(
  ({ show = false, className, children, ...props }, ref) => {
    if (!show) return null;

    return (
      <Button
        variant="ghost"
        ref={ref}
        type="button"
        className={cn(
          "w-full flex gap-2 items-center border-2 border-primary",
          className,
        )}
        {...props}
      >
        <Trash2 />
        <span>{children}</span>
      </Button>
    );
  },
);
RemoveImageButton.displayName = "ImageSelect.RemoveImageButton";
RemoveImageButton.propTypes = {
  show: PropTypes.bool.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default RemoveImageButton;
