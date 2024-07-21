import * as Input from "../../components/ui/Input.jsx";
import BasicAuthHeader from "./components/BasicAuthHeader.jsx";
import AuthFormBase from "./components/AuthFormBase.jsx";
import AuthButton from "./components/AuthButton.jsx";
import AuthParagraph from "./components/AuthParagraph.jsx";

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
  forgotPasswordSchema,
  defaultValues,
} from "../../schemas/forgotPasswordSchema.js";

const ForgotPasswordPage = () => {
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
      <BasicAuthHeader title="Ai uitat parola?" />

      <AuthParagraph>
        Introdu adresa de email a contului tău pentru a primi instrucțiunile de
        schimbare a parolei.
      </AuthParagraph>

      <Form {...form}>
        <AuthFormBase handleSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input.SuperRoot>
                    <Input.Field placeholder="Email" {...field} />
                  </Input.SuperRoot>
                </FormControl>
                <InputErrorMessage />
              </FormItem>
            )}
          />

          <AuthButton title="Trimite" />
        </AuthFormBase>
      </Form>
    </div>
  );
};
ForgotPasswordPage.displayName = "ForgotPassword";

export default ForgotPasswordPage;
