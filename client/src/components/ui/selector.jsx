import { forwardRef, useRef, useEffect } from "react";
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
    const children = ref.current?.children;

    if (!children || children.length === 0)
      throw new Error("Selector <Group> can't be empty");

    const childrenArr = Array.from(children);

    if (!childrenArr.every((child) => child.dataset.type === "selector-item")) {
      throw new Error("Selector <Group> must have only <Item> children");
    }

    if (!defaultValue)
      throw new Error("Selector <Group> must have a 'defaultValue'");

    const defaultItem = childrenArr.find(
      (child) => child.dataset.value === defaultValue,
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

export const Item = forwardRef(
  ({ className, value, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "li";

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
Item.displayName = "Item";
