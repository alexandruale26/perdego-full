import { Link } from "react-router-dom";
import Button from "../components/ui/button";
import * as Input from "../components/ui/input";
import AuthenticateHeader from "../components/authenticate/AuthenticateHeader";
import AuthenticateFormBase from "../components/authenticate/AuthenticateFormBase";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <div>
      <AuthenticateHeader defaultValue="autentificare" />

      <AuthenticateFormBase handleSubmit={handleSubmit}>
        <Input.Root>
          <Input.Field id="email" placeholder="Adresa ta de e-mail" />
        </Input.Root>
        <Input.Root>
          <Input.Field id="password" placeholder="Introdu parola" />
        </Input.Root>

        <span className="text-sm text-start ml-2 mt-4">
          <strong className="font-semibold hover:border-b-2 hover:border-secondary transition-colors">
            <Link to="/am-uitat-parola">Ai uitat parola?</Link>
          </strong>
        </span>

        <Button type="submit" className="mx-10 my-8">
          Intrǎ în cont
        </Button>
      </AuthenticateFormBase>
    </div>
  );
};
Login.displayName = "Login";

export default Login;
