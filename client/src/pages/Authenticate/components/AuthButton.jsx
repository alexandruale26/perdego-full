import PropTypes from "prop-types";
import Button from "../../../components/ui/Button";

// TODO: add spinner later and deactivate on loading
const AuthButton = ({ title, ...props }) => {
  return (
    <Button type="submit" className="mx-10 my-8" {...props}>
      {title}
    </Button>
  );
};
AuthButton.displayName = "AuthButton";
AuthButton.propTypes = {
  title: PropTypes.string,
};

export default AuthButton;
