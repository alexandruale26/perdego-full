import { Link } from "react-router-dom";
import * as Selector from "../components/ui/selector";
import Button from "../components/ui/button";
import * as Input from "../components/ui/input";

const Signup = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <>
      <Selector.Group defaultValue="cont-nou">
        <Selector.Item asChild value="autentificare" className="pl-4">
          <Link to="/autentificare">Intrǎ în cont</Link>
        </Selector.Item>
        <Selector.Item asChild value="cont-nou" className="text-end pr-4">
          <Link to="/cont-nou">Creeazǎ un cont</Link>
        </Selector.Item>
      </Selector.Group>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-8">
        <Input.Root>
          <Input.Field id="email" placeholder="Adresa ta de email" />
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
      </form>
    </>
  );
};

export default Signup;
