import * as Input from "../components/ui/input";
import BasicAuthenticateHeader from "../components/authenticate/BasicAuthenticateHeader";
import AuthenticateFormBase from "../components/authenticate/AuthenticateFormBase";
import Button from "../components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  InputErrorMessage,
} from "../components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  defaultValues,
} from "../schemas/forgotPasswordSchema.js";

const ForgotPassword = () => {
  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <div>
      <BasicAuthenticateHeader title="Ai uitat parola?" />

      <p className="tracking-wide leading-relaxed mt-8">
        Introdu adresa de e-mail a contului tău pentru a primi instrucțiunile de
        schimbare a parolei.
      </p>

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

          <Button type="submit" className="mx-10 my-8">
            Trimite
          </Button>
        </AuthenticateFormBase>
      </Form>
    </div>
  );
};

export default ForgotPassword;
