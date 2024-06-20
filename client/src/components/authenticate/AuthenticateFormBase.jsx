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

export default AuthenticateFormBase;
