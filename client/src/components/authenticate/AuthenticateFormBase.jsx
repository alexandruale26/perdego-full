import PropTypes from "prop-types";
import { cn } from "../../lib/utils";

const AuthenticateFormBase = ({
  className,
  children,
  handleSubmit = undefined,
  ...props
}) => {
  if (!handleSubmit)
    throw new Error("<AuthenticateFormBase> must have a 'handleSubmit");

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-4 pt-8", className)}
      {...props}
    >
      {children}
    </form>
  );
};
AuthenticateFormBase.displayName = "AuthenticateFormBase";
AuthenticateFormBase.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default AuthenticateFormBase;
