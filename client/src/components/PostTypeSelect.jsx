import { forwardRef, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { useFormField, FormField, FormItem, FormControl } from "./ui/Form";
import { cn } from "../lib/utils";

const options = [
  { label: "Pierdute", value: "pierdute" },
  { label: "Găsite", value: "gasite" },
];

const PostTypeSelect = forwardRef(
  ({ className, showLabel = true, formControl }, ref) => {
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
        control={formControl}
        name="type"
        render={({ field }) => (
          <FormItem>
            {showLabel && <p className="text-lg">Categorie anunț</p>}
            <FormControl>
              <RadioGroupPrimitive.Root
                className={cn("flex flex-col items-center w-full", className)}
                tabIndex={-1}
                ref={ref}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <div ref={parentRef} className="flex w-full">
                  {options.map((option) => (
                    <FormItem key={option.value} className="w-full space-y-0">
                      <FormControl>
                        <Item value={option.value} hidden />
                      </FormControl>
                      <Label value={option.value}>{option.label}</Label>
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
  },
);
PostTypeSelect.displayName = "PostTypeSelect";
PostTypeSelect.propTypes = {
  className: PropTypes.string,
  formControl: PropTypes.object.isRequired,
  showLabel: PropTypes.bool,
};

const Item = forwardRef((props, ref) => {
  return <RadioGroupPrimitive.Item ref={ref} {...props} />;
});
Item.displayName = "PostTypeSelect.Item";

const Label = ({ value, ...props }) => {
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
        data-value={value}
        className="w-full pb-1.5 text-lg cursor-pointer select-none"
        {...props}
      />
    </div>
  );
};
Label.displayName = "PostTypeSelect.Label";
Label.propTypes = { value: PropTypes.string.isRequired };

export default PostTypeSelect;
