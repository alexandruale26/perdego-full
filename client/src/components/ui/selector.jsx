import { forwardRef, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../lib/utils";

export const Group = ({
  className,
  children,
  defaultValue = undefined,
  ...props
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const childrenArr = Array.from(ref.current?.children);

    if (!childrenArr.every((child) => child.dataset.type === "selector-item")) {
      throw new Error("Selector <Group> must have only <Item> children");
    }

    const defaultItem = childrenArr.find(
      (child) => child.dataset.value === defaultValue,
    );

    if (!defaultItem)
      throw new Error(
        "Selector <Group> must have a valid 'defaultValue. Insert valid 'defaultValue' to <Group> or 'value' to <Item>",
      );

    defaultItem.classList.add("border-b-4");
  }, [defaultValue]);

  return (
    <ul
      className={cn(
        "w-full h-14 flex items-start border-b border-b-primary",
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </ul>
  );
};
Group.displayName = "Selector.Group";
Group.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  defaultValue: PropTypes.string.isRequired,
};

export const Item = forwardRef(
  ({ className, value = undefined, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "li";

    if (!value) throw new Error("Selector <Item> must have a value");

    return (
      <Comp
        className={cn("w-full h-full text-lg border-b-primary", className)}
        ref={ref}
        data-type="selector-item"
        data-value={value}
        {...props}
      />
    );
  },
);
Item.displayName = "Selector.Item";
Item.propTypes = {
  className: PropTypes.string,
  asChild: PropTypes.bool,
  value: PropTypes.string.isRequired,
};
