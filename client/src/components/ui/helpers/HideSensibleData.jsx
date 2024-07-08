import { useState } from "react";
import PropTypes from "prop-types";
import { cn } from "../../../lib/utils.js";
import { Eye, EyeOff } from "lucide-react";

export const HideSensibleData = ({ className, name, ...props }) => {
  const [hidden, setHidden] = useState(true);

  const handleClick = () => {
    const inputField = document.getElementsByName(name)[0];
    const attributeValue = inputField.getAttribute("type");

    if (attributeValue !== "password" && hidden) {
      throw new Error(
        "<HideSensibleData> expects Input.<Field> to have a type='password' attribute",
      );
    }
    if (attributeValue === "password") {
      inputField.setAttribute("type", "text");
      setHidden(false);
    } else if (attributeValue === "text") {
      inputField.setAttribute("type", "password");
      setHidden(true);
    }
  };

  // !!! don't ever forget type='button', <form> will think it's a submit button
  return (
    <button
      type="button"
      onClick={handleClick}
      tabIndex={-1}
      className={cn("size-7 p-0 rounded-full", className)}
      {...props}
    >
      {hidden ? <EyeOff /> : <Eye />}
    </button>
  );
};
HideSensibleData.displayName = "HideField";
HideSensibleData.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default HideSensibleData;
