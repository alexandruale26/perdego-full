import { Link } from "react-router-dom";
import * as Input from "../components/ui/input";
import AuthenticateHeader from "../components/authenticate/AuthenticateHeader";
import AuthenticateFormBase from "../components/authenticate/AuthenticateFormBase";
import AuthButton from "../components/authenticate/AuthButton";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  InputErrorMessage,
} from "../components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, defaultValues } from "../schemas/loginSchema";

const Login = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues,
    mode: "onChange",
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
                  <Input.SuperRoot>
                    <Input.Field placeholder="Adresa ta de e-mail" {...field} />
                  </Input.SuperRoot>
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
                <FormControl>
                  <Input.SuperRoot addSensible>
                    <Input.Field
                      placeholder="Introdu parola"
                      type="password"
                      {...field}
                    />
                  </Input.SuperRoot>
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

          <AuthButton title="Intrǎ în cont" />
        </AuthenticateFormBase>
      </Form>
    </div>
  );
};
Login.displayName = "Login";

export default Login;
