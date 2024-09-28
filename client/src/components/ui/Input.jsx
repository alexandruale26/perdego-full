import { forwardRef } from "react";
import PropTypes from "prop-types";
import { cn } from "../../utils/cn";
import { cva } from "class-variance-authority";
import ClearField from "./helpers/ClearField";
import HideSensibleData from "./helpers/HideSensibleData";
import AddValidation from "./helpers/AddValidation";
import { useFormField } from "./Form";

const inputVariants = cva(
  "flex w-full h-14 pl-6 pr-22 border text-base rounded-md font-semibold border-grey-4 ring-offset-primary placeholder:text-grey-3 placeholder:font-normal focus-visible:outline-0 focus-visible:ring-1 focus-visible:border-primary focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50",
);

export const Root = ({ children, clearField, className }) => {
  return (
    <div
      className={cn(
        "relative w-full flex items-center justify-center input--root", // TODO: ce e input-root
        className,
      )}
    >
      {children}
      {clearField ? <ClearField clearField={clearField} /> : null}
    </div>
  );
};
Root.displayName = "Input.Root";
Root.propTypes = {
  children: PropTypes.node.isRequired,
  clearField: PropTypes.func,
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

export const Field = forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(inputVariants({ className }))}
      ref={ref}
      {...props}
    />
  );
});
Field.displayName = "Input.Field";
Field.propTypes = { className: PropTypes.string, type: PropTypes.string };
