import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";

const inputVariants = cva(
  "flex h-14 w-full rounded-md border border-grey-4 px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        form: "bg-transparent rounded-sm",
        search: "bg-grey-6 rounded-md",
      },
    },
    defaultVariants: {
      variant: "form",
    },
  },
);

const Field = forwardRef(({ className, type, variant, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(inputVariants({ variant, className }))}
      ref={ref}
      {...props}
    />
  );
});
Field.displayName = "Field";

export const Root = ({ children }) => {
  return <div className="relative input--root">{children}</div>;
};

export const Clear = ({ className, ...props }) => {
  const handleClick = (e) => {
    const parent = e.currentTarget.parentNode;

    if (!parent || !parent.classList.contains("input--root")) {
      throw new Error("<Clear> element must be a direct child of <Root>");
    }

    const input = parent.querySelectorAll("input");
    if (input.length !== 1) {
      throw new Error("<Root> element must have only one <input> tag");
    }

    input[0].value = "";
    input[0].focus();
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "size-6 p-0 rounded-full absolute inset-y-0 right-1 shrink-0 top-1/2 -translate-y-1/2",
        className,
      )}
      {...props}
    >
      <X width={20} height={20} />
    </button>
  );
};

export { Field };
