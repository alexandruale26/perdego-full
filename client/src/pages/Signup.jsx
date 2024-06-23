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
import { signupSchema, defaultValues } from "../schemas/signupSchema.js";

const Signup = () => {
  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <div>
      <AuthenticateHeader defaultValue="cont-nou" />

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
                      placeholder="Creeazǎ o parolǎ"
                      {...field}
                      type="password"
                    />
                  </Input.SuperRoot>
                </FormControl>
                <InputErrorMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input.SuperRoot addSensible>
                    <Input.Field
                      placeholder="Confirmǎ parola"
                      {...field}
                      type="password"
                    />
                  </Input.SuperRoot>
                </FormControl>
                <InputErrorMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input.SuperRoot>
                    <Input.Field placeholder="Numele tǎu" {...field} />
                  </Input.SuperRoot>
                </FormControl>
                <InputErrorMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input.SuperRoot>
                    <Input.Field placeholder="Locație" {...field} />
                  </Input.SuperRoot>
                </FormControl>
                <InputErrorMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input.SuperRoot>
                    <Input.Field
                      placeholder="Numarul tǎu de telefon"
                      {...field}
                    />
                  </Input.SuperRoot>
                </FormControl>
                <InputErrorMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="mx-10 my-8">
            Creeazǎ un cont
          </Button>
        </AuthenticateFormBase>
      </Form>
    </div>
  );
};
Signup.displayName = "Signup";

export default Signup;
