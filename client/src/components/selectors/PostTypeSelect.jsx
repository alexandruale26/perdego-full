import { forwardRef, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { useFormField, FormField, FormItem, FormControl } from "../ui/Form";
import { cn } from "../../utils/cn";

const options = [
  { label: "Pierdute", value: "pierdute" },
  { label: "Găsite", value: "gasite" },
];

const PostTypeSelect = forwardRef(({ className, control }, ref) => {
  const [selected, setSelected] = useState(0);
  const parentRef = useRef(null);

  useEffect(() => {
    const inputs = parentRef.current.querySelectorAll("input");
    const labels = parentRef.current.querySelectorAll("label");

    inputs.forEach((field, index) => {
      if (field.hasAttribute("checked")) {
        labels[index].style.color = "var(--grey)";
        setSelected(index);
      } else {
        labels[index].style.color = "var(--grey3)";
      }
    });
  });

  return (
    <FormField
      control={control}
      name="type"
      render={({ field }) => (
        <FormItem>
          <p className="text-xl">Categorie anunț</p>
          <FormControl>
            <RadioGroupPrimitive.Root
              className={cn("flex flex-col items-center w-full", className)}
              tabIndex={-1}
              ref={ref}
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <div ref={parentRef} className="flex w-full">
                {options.map(({ value, label }) => (
                  <FormItem key={value} className="w-full space-y-1">
                    <FormControl>
                      <RadioGroupPrimitive.Item value={value} hidden />
                    </FormControl>
                    <Label>{label}</Label>
                  </FormItem>
                ))}
              </div>
              <div className="relative w-full h-1 bg-grey-5">
                <div
                  className="absolute top-0 h-1 transition-all duration-200 ease-in-out bg-primary"
                  style={{
                    width: `${100 / options.length}%`,
                    left: `${(100 / options.length) * selected}%`,
                  }}
                />
              </div>
            </RadioGroupPrimitive.Root>
          </FormControl>
        </FormItem>
      )}
    />
  );
});
PostTypeSelect.displayName = "PostTypeSelect";
PostTypeSelect.propTypes = {
  className: PropTypes.string,
  control: PropTypes.object,
};

const Label = ({ children }) => {
  const { formItemId } = useFormField();

  const handleOnKeydown = (e) => {
    if (e.key === "Enter") {
      const fields = document.querySelectorAll('button[role="radio"]');

      fields.forEach((field) => {
        if (field.id === formItemId) field.click();
      });
    }
  };

  return (
    <div className="flex w-full">
      <label
        htmlFor={formItemId}
        tabIndex={0}
        onKeyDown={handleOnKeydown}
        className="w-full pb-1.5 px-1 text-lg font-medium cursor-pointer select-none focus-visible:outline-primary"
      >
        {children}
      </label>
    </div>
  );
};
Label.displayName = "PostTypeSelect.Label";
Label.propTypes = {
  children: PropTypes.node,
};

export default PostTypeSelect;
