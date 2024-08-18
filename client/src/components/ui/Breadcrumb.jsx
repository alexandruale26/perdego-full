import { forwardRef } from "react";
import PropTypes from "prop-types";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "../../utils/cn";

const Breadcrumb = forwardRef(({ ...props }, ref) => (
  <nav ref={ref} aria-label="breadcrumb" {...props} />
));
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = forwardRef(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1.5 mt-10 break-words text-base text-grey-3",
      className,
    )}
    {...props}
  />
));
BreadcrumbList.displayName = "BreadcrumbList";
BreadcrumbList.propTypes = { className: PropTypes.string };

const BreadcrumbItem = forwardRef(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
));
BreadcrumbItem.displayName = "BreadcrumbItem";
BreadcrumbItem.propTypes = { className: PropTypes.string };

const BreadcrumbLink = forwardRef(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      ref={ref}
      className={cn("transition-colors hover:text-black", className)}
      {...props}
    />
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink";
BreadcrumbLink.propTypes = {
  className: PropTypes.string,
  asChild: PropTypes.bool,
};

const BreadcrumbPage = forwardRef(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("text-black", className)}
    {...props}
  />
));
BreadcrumbPage.displayName = "BreadcrumbPage";
BreadcrumbPage.propTypes = { className: PropTypes.string };

const BreadcrumbSeparator = ({ children, className, ...props }) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:size-5", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";
BreadcrumbSeparator.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

const BreadcrumbEllipsis = ({ className, ...props }) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis";
BreadcrumbEllipsis.propTypes = { className: PropTypes.string };

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
