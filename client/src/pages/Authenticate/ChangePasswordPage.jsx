import * as Input from "../../components/ui/Input";
import BasicAuthHeader from "./components/BasicAuthHeader";
import AuthFormBase from "./components/AuthFormBase";
import AuthButton from "./components/AuthButton";
import AuthParagraph from "./components/AuthParagraph";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  InputErrorMessage,
} from "../../components/ui/Form.jsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  changePasswordSchema,
  defaultValues,
} from "../../schemas/changePasswordSchema.js";

const ChangePasswordPage = () => {
  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <div>
      <BasicAuthHeader title="Parolǎ nouǎ" />

      <AuthParagraph>
        Te rugăm să introduci noua parolă pentru contul tău în câmpurile de mai
        jos.
      </AuthParagraph>

      <Form {...form}>
        <AuthFormBase handleSubmit={form.handleSubmit(onSubmit)}>
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

          <AuthButton title="Creeazǎ parolǎ nouǎ" />
        </AuthFormBase>
      </Form>
    </div>
  );
};
ChangePasswordPage.displayName = "ChangePassword";

export default ChangePasswordPage;
