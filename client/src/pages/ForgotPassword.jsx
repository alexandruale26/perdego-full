import * as Input from "../components/ui/input";
import BasicAuthenticateHeader from "../components/authenticate/BasicAuthenticateHeader";
import AuthenticateFormBase from "../components/authenticate/AuthenticateFormBase";
import Button from "../components/ui/button";

const ForgotPassword = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <div>
      <BasicAuthenticateHeader
        defaultValue="am-uitat-parola"
        title="Ai uitat parola?"
      />

      <p className="tracking-wide leading-relaxed mt-8">
        Introdu adresa de e-mail a contului tău pentru a primi instrucțiunile de
        schimbare a parolei.
      </p>

      <AuthenticateFormBase handleSubmit={handleSubmit}>
        <Input.Root>
          <Input.Field id="email" placeholder="Adresa ta de e-mail" />
        </Input.Root>

        <Button type="submit" className="mx-10 my-8">
          Trimite
        </Button>
      </AuthenticateFormBase>
    </div>
  );
};

export default ForgotPassword;
