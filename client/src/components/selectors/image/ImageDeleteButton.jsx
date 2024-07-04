import { forwardRef } from "react";
import PropTypes from "prop-types";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { Trash2 } from "lucide-react";
import { Button } from "../../ui/Button";
import cn from "../../../lib/utils";

// TODO: button variant destructive if makes sense

const ImageDeleteButton = forwardRef(
  ({ show = false, className, children, ...props }, ref) => {
    return (
      <LazyMotion features={domAnimation}>
        <AnimatePresence>
          {show && (
            <m.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: [0, 0, 0, 1],
                y: [-50, 0],
                scale: [0.2, 1],
                height: "auto",
              }}
              exit={{ opacity: 0, scale: 0, height: 0 }}
              transition={{ ease: "easeInOut", duration: 0.2 }}
            >
              <Button
                variant="destructive"
                ref={ref}
                type="button"
                contentDirection="left-to-right"
                className={cn("mt-1 w-full", className)}
                {...props}
              >
                <Trash2 width={18} height={18} />
                {children}
              </Button>
            </m.div>
          )}
        </AnimatePresence>
      </LazyMotion>
    );
  },
);
ImageDeleteButton.displayName = "ImageDeleteButton";
ImageDeleteButton.propTypes = {
  show: PropTypes.bool.isRequired,
  className: PropTypes.string,
  children: PropTypes.element,
};

export default ImageDeleteButton;
