import { createContext, useContext, forwardRef, useId } from "react";
import { Slot } from "@radix-ui/react-slot";
import { Controller, FormProvider, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";

import { cn } from "../../lib/utils.js";
import Label from "./Label";

// Root of <form> from RFH useFormContext/FormProvider
export const Form = FormProvider;
const FormFieldContext = createContext({});

// Root component of RFH Controller
export const FormField = ({ ...props }) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};
FormField.displayName = "FormField";
FormField.propTypes = { name: PropTypes.string.isRequired };

// eslint-disable-next-line react-refresh/only-export-components
export const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

const FormItemContext = createContext({});

// Parent of label and input
export const FormItem = ({ className, ...props }) => {
  const id = useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  );
};
FormItem.displayName = "FormItem";
FormItem.propTypes = { className: PropTypes.string };

// Input label
export const FormLabel = ({ className, ...props }) => {
  const { formItemId } = useFormField();

  return (
    <Label
      className={cn("text-lg", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
};
FormLabel.displayName = "FormLabel";
FormLabel.propTypes = { className: PropTypes.string };

// Parent of input
export const FormControl = forwardRef(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

// Validation error message
export const InputErrorMessage = ({ className, ...props }) => {
  const { error, formMessageId } = useFormField();
  const errorMsg = error?.message;

  if (!errorMsg) return null;

  return (
    <p
      id={formMessageId}
      className={cn("text-sm text-destructive", className)}
      {...props}
    >
      {errorMsg}
    </p>
  );
};
InputErrorMessage.displayName = "InputErrorMessage";
InputErrorMessage.propTypes = { className: PropTypes.string };
