import PropTypes from "prop-types";
import { cn } from "../../../utils/cn";
import { X } from "lucide-react";

export const ClearField = ({ clearField, className, ...props }) => {
  return (
    <button
      tabIndex={-1}
      type="button"
      onClick={() => clearField()}
      className={cn(
        "size-7 flex items-center justify-center p-0 rounded-full absolute inset-y-0 right-2 shrink-0 top-1/2 -translate-y-1/2",
        className,
      )}
      {...props}
    >
      <X />
    </button>
  );
};
ClearField.displayName = "Input.ClearField";
ClearField.propTypes = {
  clearField: PropTypes.func,
  className: PropTypes.string,
};

export default ClearField;
