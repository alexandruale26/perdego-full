import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import * as Selector from "../ui/selector";

const AuthenticateHeader = ({ defaultValue }) => {
  return (
    <Selector.Group defaultValue={defaultValue}>
      <Selector.Item asChild value="autentificare" className="pl-4">
        <Link to="/autentificare">Intrǎ în cont</Link>
      </Selector.Item>
      <Selector.Item asChild value={"cont-nou"} className="text-end pr-4">
        <Link to="/cont-nou">Creeazǎ un cont</Link>
      </Selector.Item>
    </Selector.Group>
  );
};
AuthenticateHeader.displayName = "AuthenticateHeader";
AuthenticateHeader.propTypes = { defaultValue: PropTypes.string.isRequired };

export default AuthenticateHeader;
