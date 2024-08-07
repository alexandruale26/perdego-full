import { forwardRef } from "react";
import PropTypes from "prop-types";
import { cn } from "../../lib/utils";
import AddValidation from "./helpers/AddValidation";
import { useFormField } from "./Form";

export const Root = ({ className, children }) => {
  const { error, invalid, isDirty } = useFormField();

  return (
    <div
      className={cn(
        "relative w-full flex items-center justify-center",
        className,
      )}
    >
      {children}
      <div className="flex items-center justify-end absolute inset-y-0 right-4 shrink-0 top-7 -translate-y-1/2">
        <AddValidation
          fieldValidity={{ error: error?.message, invalid, isDirty }}
        />
      </div>
    </div>
  );
};
Root.displayName = "Textarea.Root";
Root.propTypes = { className: PropTypes.string, children: PropTypes.element };

export const Field = forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-40 max-h-60 w-full pl-6 pr-22 py-4 text-base font-semibold rounded-sm border border-grey-4 bg-transparent placeholder:text-grey-3 placeholder:font-normal focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Field.displayName = "Textarea.Field";
Field.propTypes = { className: PropTypes.string };
