import * as Input from "../components/ui/input";
import BasicAuthenticateHeader from "../components/authenticate/BasicAuthenticateHeader";
import AuthenticateFormBase from "../components/authenticate/AuthenticateFormBase";
import Button from "../components/ui/button";

const ChangePassword = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <div>
      <BasicAuthenticateHeader
        defaultValue="schimba-parola"
        title="Parolǎ nouǎ"
      />

      <AuthenticateFormBase handleSubmit={handleSubmit}>
        <Input.Root>
          <Input.Field id="password" placeholder="Creeazǎ o parolǎ" />
        </Input.Root>
        <Input.Root>
          <Input.Field id="passwordConfirm" placeholder="Confirmǎ parola" />
        </Input.Root>

        <Button type="submit" className="mx-10 my-8">
          Creeazǎ parolǎ nouǎ
        </Button>
      </AuthenticateFormBase>
    </div>
  );
};
ChangePassword.displayName = "ChangePassword";

export default ChangePassword;
