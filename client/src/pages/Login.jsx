import { Link } from "react-router-dom";
import * as Selector from "../components/ui/selector";

const Login = () => {
  return (
    <Selector.Group defaultValue="autentificare">
      <Selector.Item asChild value="autentificare" className="pl-4">
        <Link to="/autentificare">Intrǎ în cont</Link>
      </Selector.Item>
      <Selector.Item asChild value="cont-nou" className="text-end pr-4">
        <Link to="/cont-nou">Creeazǎ un cont</Link>
      </Selector.Item>
    </Selector.Group>
  );
};

export default Login;
