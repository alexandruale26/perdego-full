import Button from "../components/ui/button";
import * as Input from "../components/ui/input";
import AuthenticateHeader from "../components/authenticate/AuthenticateHeader";
import AuthenticateFormBase from "../components/authenticate/AuthenticateFormBase";

const Signup = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <div>
      <AuthenticateHeader defaultValue="cont-nou" />

      <AuthenticateFormBase handleSubmit={handleSubmit}>
        <Input.Root>
          <Input.Field
            id="email"
            placeholder="Adresa ta de e-mail"
            className="border-error border"
          />
        </Input.Root>
        <Input.Root>
          <Input.Field id="password" placeholder="Creeazǎ o parolǎ" />
        </Input.Root>
        <Input.Root>
          <Input.Field id="passwordConfirm" placeholder="Confirmǎ parola" />
        </Input.Root>
        <Input.Root>
          <Input.Field id="name" placeholder="Numele tǎu" />
        </Input.Root>
        <Input.Root>
          <Input.Field id="location" placeholder="Locație" />
        </Input.Root>
        <Input.Root>
          <Input.Field id="phone" placeholder="Numarul tǎu de telefon" />
        </Input.Root>
        <Button type="submit" className="mx-10 my-8">
          Creeazǎ un cont
        </Button>
      </AuthenticateFormBase>
    </div>
  );
};
Signup.displayName = "Signup";

export default Signup;
