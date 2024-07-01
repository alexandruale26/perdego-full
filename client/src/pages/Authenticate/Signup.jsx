import { useState, useEffect } from "react";
import * as Input from "../../components/ui/input/Input";
import AuthHeader from "./components/AuthHeader";
import AuthFormBase from "./components/AuthFormBase";
import AuthButton from "./components/AuthButton";
import AuthParagraph from "./components/AuthParagraph";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  InputErrorMessage,
} from "../../components/ui/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signupProfileSchema,
  signupAccountSchema,
  defaultValues,
} from "../../schemas/signupSchema.js";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const form = useForm({
    resolver: zodResolver(
      step === 1 ? signupAccountSchema : signupProfileSchema,
    ),
    defaultValues,
    mode: "onChange",
  });

  const { reset } = form;

  useEffect(() => {
    if (step === 2) reset({ ...formData });
  }, [step, reset, formData]);

  const onSubmit = (data) => {
    if (step === 1) {
      setFormData(data);
      setStep(2);
    } else {
      const finalData = { ...formData, ...data };
      console.log("Final data", finalData);
    }
  };

  return (
    <div>
      <AuthHeader defaultTab="/cont-nou" />

      <AuthParagraph className="text-md font-bold">
        {step === 1 ? "Contul tǎu" : "Profilul tǎu"}
      </AuthParagraph>

      <Form {...form}>
        <AuthFormBase handleSubmit={form.handleSubmit(onSubmit)}>
          {step === 1 && (
            <>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input.SuperRoot>
                        <Input.Field
                          placeholder="Adresa ta de e-mail"
                          {...field}
                        />
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
                          placeholder="Creeazǎ parolǎ"
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
            </>
          )}

          {step === 2 && (
            <>
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
                        <Input.Field placeholder="Localitate" {...field} />
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
                        <Input.Field placeholder="Telefon" {...field} />
                      </Input.SuperRoot>
                    </FormControl>
                    <InputErrorMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {step === 1 && <AuthButton title="Continua" />}
          {step === 2 && <AuthButton title="Creeazǎ un cont" />}
        </AuthFormBase>
      </Form>
    </div>
  );
};
Signup.displayName = "Signup";

export default Signup;
