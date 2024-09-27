import { useEffect, useRef, useState, forwardRef, Fragment } from "react";
import PropTypes from "prop-types";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "../../../utils/cn";

const options = [
  { label: "Pierdute", value: "pierdute" },
  { label: "Găsite", value: "gasite" },
];

const SearchPostTypeSelect = ({ className }) => {
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
    <div>
      <RadioGroupPrimitive.Root
        className={cn("flex flex-col items-center w-full", className)}
        tabIndex={-1}
        // onValueChange={field.onChange}
        // defaultValue={field.value}
      >
        <div ref={parentRef} className="flex w-full">
          {options.map((option) => (
            <Fragment key={option}>
              <Item value={option.value} hidden />
              <Label value={option.value}>{option.label}</Label>
            </Fragment>
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
    </div>
  );
};

const Item = forwardRef((props, ref) => {
  return <RadioGroupPrimitive.Item ref={ref} {...props} />;
});
Item.displayName = "PostTypeSelect.Item";

const Label = ({ value, selected, ...props }) => {
  const handleOnKeydown = (e) => {
    if (e.key === "Enter") {
      const fields = document.querySelectorAll('button[role="radio"]');

      fields.forEach((field) => {
        if (field.id === selected) field.click();
      });
    }
  };

  return (
    <div className="flex w-full">
      <label
        htmlFor={selected}
        tabIndex={0}
        onKeyDown={handleOnKeydown}
        data-value={value}
        className="w-full pb-1.5 px-1 text-lg font-medium cursor-pointer select-none focus-visible:outline-primary"
        {...props}
      />
    </div>
  );
};
Label.displayName = "PostTypeSelect.Label";
Label.propTypes = {
  value: PropTypes.string.isRequired,
  selected: PropTypes.string,
};

export default SearchPostTypeSelect;
