import { Link } from "react-router-dom";
import Button from "../components/ui/button";
import * as Input from "../components/ui/input";
import AuthenticateHeader from "../components/authenticate/AuthenticateHeader";
import AuthenticateFormBase from "../components/authenticate/AuthenticateFormBase";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  InputErrorMessage,
} from "../components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
});

const Login = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
  });

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <div>
      <AuthenticateHeader defaultValue="autentificare" />

      <Form {...form}>
        <AuthenticateFormBase handleSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input.Field placeholder="Adresa ta de e-mail" {...field} />
                </FormControl>
                <InputErrorMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl addSensible={true}>
                  <Input.Field
                    placeholder="Introdu parola"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <InputErrorMessage />
              </FormItem>
            )}
          />

          <span className="text-sm text-start ml-2 mt-4">
            <strong className="font-semibold hover:border-b-2 hover:border-secondary transition-colors">
              <Link to="/am-uitat-parola">Ai uitat parola?</Link>
            </strong>
          </span>

          <Button type="submit" className="mx-10 my-8">
            Intrǎ în cont
          </Button>
        </AuthenticateFormBase>
      </Form>
    </div>
  );
};
Login.displayName = "Login";

export default Login;
