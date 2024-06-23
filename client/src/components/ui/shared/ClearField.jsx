import PropTypes from "prop-types";
import { cn } from "../../../lib/utils.js";
import { X } from "lucide-react";

export const ClearField = ({ className, ...props }) => {
  const handleClick = (e) => {
    const parent = e.currentTarget.parentNode;

    if (!parent || !parent.classList.contains("input--root")) {
      throw new Error("<Clear> element must be a direct child of <Root>");
    }

    const input = parent.querySelectorAll("input");
    if (input.length !== 1) {
      throw new Error("<Root> element must have only one <input> tag");
    }

    input[0].value = "";
    input[0].focus();
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "size-7 flex items-center justify-center p-0 rounded-full absolute inset-y-0 right-2 shrink-0 top-1/2 -translate-y-1/2",
        className,
      )}
      {...props}
    >
      <X width={24} height={24} />
    </button>
  );
};
ClearField.displayName = "Input.ClearField";
ClearField.propTypes = { className: PropTypes.string };

export default ClearField;
