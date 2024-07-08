import { forwardRef } from "react";
import PropTypes from "prop-types";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-bold tracking-wide transition-colors focus-visible:outline-none focus-visible:bg-secondary disabled:pointer-events-none disabled:bg-grey-5",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:bg-btn-primary-hover",
        cta: "bg-cta text-white hover:bg-btn-primary-hover",
        iconText: "text-primary font-semibold rounded-md",
        icon: "bg-transparent text-primary rounded-full hover:bg-grey-5 transition-colors",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        destructive: "bg-destructive text-white hover:bg-red-600",
      },
      size: {
        primary: "h-14 px-16",
        cta: "h-14 px-8",
        iconText: "h-14 gap-2 px-4",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "primary",
    },
  },
);

const Button = forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
Button.propTypes = {
  className: PropTypes.string,
  // TODO: remove unuses variants or sizes
  variant: PropTypes.oneOf([
    "primary",
    "cta",
    "ghost",
    "iconText",
    "icon",
    "destructive",
  ]),
  size: PropTypes.oneOf(["primary", "cta", "iconText", "icon"]),
  asChild: PropTypes.bool,
};

export default Button;
