import { Link } from "react-router-dom";
import * as Selector from "../components/ui/selector";

const Login = () => {
  return (
    <Selector.Group defaultValue="autentificare">
      <Selector.Item asChild value="cont-nou" className="pl-4">
        <Link to="/cont-nou">Intrǎ în cont</Link>
      </Selector.Item>
      <Selector.Item asChild value="autentificare" className="text-end pr-4">
        <Link to="/autentificare">Creeazǎ un cont</Link>
      </Selector.Item>
    </Selector.Group>
  );
};

export default Login;
