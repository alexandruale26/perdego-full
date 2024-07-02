/* eslint-disable react/prop-types */
import { forwardRef, useState, useRef, useEffect } from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { useFormField, FormField, FormItem, FormControl } from "./ui/Form";
import { cn } from "../lib/utils";

const options = [
  { label: "Pierdute", value: "pierdute" },
  { label: "Găsite", value: "gasite" },
];

const RadioSelector = forwardRef(({ className, formControl }, ref) => {
  const [selected, setSelected] = useState(0);
  const parentRef = useRef(null);

  useEffect(() => {
    const inputs = parentRef.current.querySelectorAll("input");
    inputs.forEach((field, index) => {
      const isChecked = field.hasAttribute("checked");

      if (isChecked) setSelected(index);
    });
  });

  return (
    <FormField
      control={formControl}
      name="type"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <RadioGroupPrimitive.Root
              className={cn("flex flex-col items-center w-full", className)}
              tabIndex={-1}
              ref={ref}
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <div ref={parentRef} className="flex w-full">
                <FormItem className="w-full space-y-0">
                  <FormControl>
                    <RadioSelectorItem value="pierdute" hidden />
                  </FormControl>
                  <RadioLabel>Pierdute</RadioLabel>
                </FormItem>

                <FormItem className="w-full space-y-0">
                  <FormControl>
                    <RadioSelectorItem value="gasite" hidden />
                  </FormControl>
                  <RadioLabel>Gasite</RadioLabel>
                </FormItem>
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
RadioSelector.displayName = "RadioSelector";

const RadioSelectorItem = forwardRef((props, ref) => {
  return <RadioGroupPrimitive.Item ref={ref} {...props} />;
});
RadioSelectorItem.displayName = "RadioSelector.Item";

const RadioLabel = (props) => {
  const { formItemId } = useFormField();

  return (
    <div className="flex w-full h-full">
      <label
        htmlFor={formItemId}
        className="w-full pb-1.5"
        tabIndex={0}
        {...props}
      />
    </div>
  );
};
RadioLabel.displayName = "RadioSelector.Label";

export default RadioSelector;

/*
<FormItem className="w-full space-y-0">
                      <FormControl>
                        <RadioSelectorItem value="pierdute" hidden />
                      </FormControl>
                      <RadioLabel>Pierdute</RadioLabel>
                    </FormItem>

                    <FormItem className="w-full space-y-0">
                      <FormControl>
                        <RadioSelectorItem value="gasite" hidden />
                      </FormControl>
                      <RadioLabel>Gasite</RadioLabel>
                    </FormItem>
*/
