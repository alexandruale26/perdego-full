import { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import { cn } from "../../lib/utils";
import { cva } from "class-variance-authority";
import { X, Eye, EyeOff } from "lucide-react";
import { useFormField } from "./form";

const inputVariants = cva(
  "flex w-full border text-base border-grey-4 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-grey-3 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        form: "bg-transparent rounded-sm",
        search: "bg-grey-6 rounded-md",
      },
      size: {
        form: " h-14 pl-6 pr-14",
        search: " h-14 px-12",
      },
    },
    defaultVariants: {
      variant: "form",
      size: "form",
    },
  },
);

export const Root = ({
  children,
  addSensible = false,
  addClear = false,
  addValidation = false,
  className,
}) => {
  return (
    <div
      className={cn(
        "relative w-full flex items-center justify-center input--root",
        className,
      )}
    >
      {children}
    </div>
  );
};
Root.displayName = "Input.Root";
Root.propTypes = {
  children: PropTypes.node.isRequired,
  addSensible: PropTypes.bool,
  addClear: PropTypes.bool,
  addValidation: PropTypes.bool,
  className: PropTypes.string,
};

export const Field = forwardRef(
  ({ className, type, variant, size, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Field.displayName = "Input.Field";
Field.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  variant: PropTypes.oneOf(["form", "search"]),
  size: PropTypes.oneOf(["form", "search"]),
};

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
      <X width={20} height={20} />
    </button>
  );
};
ClearField.displayName = "Input.ClearField";
ClearField.propTypes = {
  className: PropTypes.string,
};

const eyeIconSize = 24;

export const HideSensibleData = ({ className, formItemId, ...props }) => {
  const [hidden, setHidden] = useState(true);

  const handleClick = () => {
    const inputField = document.getElementById(formItemId);
    const attributeValue = inputField.getAttribute("type");

    if (attributeValue === "password") {
      inputField.setAttribute("type", "text");
      setHidden(false);
    } else if (attributeValue === "text") {
      inputField.setAttribute("type", "password");
      setHidden(true);
    }
  };

  return (
    <button
      // !!! don't ever forget type='button', <form> will think it's a submit button
      type="button"
      onClick={handleClick}
      className={cn(
        "size-7 flex items-center justify-center p-0 rounded-full absolute inset-y-0 right-4 shrink-0 top-1/2 -translate-y-1/2",
        className,
      )}
      {...props}
    >
      {hidden ? <EyeOff size={eyeIconSize} /> : <Eye size={eyeIconSize} />}
    </button>
  );
};
HideSensibleData.displayName = "HideField";
HideSensibleData.propTypes = {
  className: PropTypes.string,
  formItemId: PropTypes.string,
};
