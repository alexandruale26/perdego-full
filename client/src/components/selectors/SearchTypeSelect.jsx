import { useState, useRef, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "../../utils/cn";

const options = [
  { label: "Pierdute", value: "pierdute" },
  { label: "Găsite", value: "gasite" },
];

const SearchTypeSelect = ({ name, defaultValue = "pierdute", className }) => {
  const [selected, setSelected] = useState(defaultValue === "pierdute" ? 0 : 1);
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
    <RadioGroupPrimitive.Root
      name={name}
      tabIndex={-1}
      onValueChange={(value) => setSelected(value)}
      defaultValue={defaultValue}
      className={cn("flex flex-col items-center w-full", className)}
    >
      <div ref={parentRef} className="flex w-full">
        {options.map(({ value, label }) => (
          <Fragment key={value}>
            <RadioGroupPrimitive.Item id={value} value={value} hidden />

            <Label formItemId={value} value={value}>
              {label}
            </Label>
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
  );
};
SearchTypeSelect.displayName = "SearchTypeSelect";
SearchTypeSelect.propTypes = {
  name: PropTypes.string,
  defaultValue: PropTypes.string,
  className: PropTypes.string,
};

const Label = ({ formItemId, children }) => {
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
Label.displayName = "SearchTypeSelect.Label";
Label.propTypes = {
  children: PropTypes.node,
  formItemId: PropTypes.string,
};

export default SearchTypeSelect;
