import { forwardRef } from "react";
import PropTypes from "prop-types";

import { cn } from "../../lib/utils";

// TODO: add validation as with input

const Textarea = forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-40 max-h-80 w-full pl-6 pr-22 py-4 text-base rounded-sm border border-grey-4 bg-transparent placeholder:text-grey-3 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";
Textarea.propTypes = { className: PropTypes.string };

export default Textarea;
