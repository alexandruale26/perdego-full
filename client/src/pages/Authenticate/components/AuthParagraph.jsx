import PropTypes from "prop-types";
import { cn } from "../../../utils/cn";

const AuthParagraph = ({ className, ...props }) => {
  return (
    <p
      className={cn(
        "tracking-wide leading-relaxed mt-8 font-semibold",
        className,
      )}
      {...props}
    />
  );
};
AuthParagraph.displayName = "AuthParagraph";
AuthParagraph.propTypes = { className: PropTypes.string };

export default AuthParagraph;
