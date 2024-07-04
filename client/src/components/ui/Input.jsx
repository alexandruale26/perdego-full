import { forwardRef } from "react";
import PropTypes from "prop-types";
import { cn } from "../../lib/utils.js";
import { cva } from "class-variance-authority";
import ClearField from "./helpers/ClearField";
import HideSensibleData from "./helpers/HideSensibleData";
import AddValidation from "./helpers/AddValidation";
import { useFormField } from "./Form";

const inputVariants = cva(
  "flex w-full border text-base font-semibold border-grey-4 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-grey-3 placeholder:font-normal focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        form: "bg-transparent rounded-sm",
        search: "bg-grey-6 rounded-md",
      },
      size: {
        form: " h-14 pl-6 pr-22",
        search: " h-14 px-12",
      },
    },
    defaultVariants: {
      variant: "form",
      size: "form",
    },
  },
);

export const Root = ({ children, addClear = false, className }) => {
  return (
    <div
      className={cn(
        "relative w-full flex items-center justify-center input--root",
        className,
      )}
    >
      {children}
      {addClear && <ClearField />}
    </div>
  );
};
Root.displayName = "Input.Root";
Root.propTypes = {
  children: PropTypes.node.isRequired,
  addClear: PropTypes.bool,
  className: PropTypes.string,
};

export const SuperRoot = ({
  children,
  addSensible = false,
  addValidation = true,
  className,
}) => {
  const { name, error, invalid, isDirty } = useFormField();

  return (
    <div
      className={cn(
        "relative w-full flex items-center justify-center",
        className,
      )}
    >
      {children}
      {(addSensible || addValidation) && (
        <ul className="flex items-center justify-end gap-2 absolute inset-y-0 right-4 shrink-0 top-1/2 -translate-y-1/2">
          {addSensible && (
            <HideSensibleData key={`hide-sensible-data-${name}`} name={name} />
          )}
          {addValidation && (
            <AddValidation
              fieldValidity={{ error: error?.message, invalid, isDirty }}
            />
          )}
        </ul>
      )}
    </div>
  );
};
SuperRoot.displayName = "Input.SuperRoot";
SuperRoot.propTypes = {
  children: PropTypes.node.isRequired,
  addSensible: PropTypes.bool,
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
