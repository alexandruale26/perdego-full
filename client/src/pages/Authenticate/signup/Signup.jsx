import { useState, useEffect } from "react";
import * as Input from "../../../components/ui/input/Input.jsx";
import AuthHeader from "../components/AuthHeader.jsx";
import AuthFormBase from "../components/AuthFormBase.jsx";
import AuthButton from "../components/AuthButton.jsx";
import AuthParagraph from "../components/AuthParagraph.jsx";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { account, profile } from "./js/data.js";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  InputErrorMessage,
} from "../../../components/ui/Form.jsx";
import {
  signupProfileSchema,
  signupAccountSchema,
  defaultValues,
} from "../../../schemas/signupSchema.js";

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
              {account.map((item) => (
                <FormField
                  key={item.name}
                  control={form.control}
                  name={item.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input.SuperRoot addSensible={item.addSensible}>
                          <Input.Field
                            type={item.addSensible ? "password" : "text"}
                            placeholder={item.placeholder}
                            {...field}
                          />
                        </Input.SuperRoot>
                      </FormControl>
                      <InputErrorMessage />
                    </FormItem>
                  )}
                />
              ))}
            </>
          )}

          {step === 2 && (
            <>
              {profile.map((item) => (
                <FormField
                  key={item.name}
                  control={form.control}
                  name={item.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input.SuperRoot addSensible={item.addSensible}>
                          <Input.Field
                            type={item.addSensible ? "password" : "text"}
                            placeholder={item.placeholder}
                            {...field}
                          />
                        </Input.SuperRoot>
                      </FormControl>
                      <InputErrorMessage />
                    </FormItem>
                  )}
                />
              ))}
            </>
          )}

          {step === 1 && <AuthButton title="Continuǎ" />}
          {step === 2 && <AuthButton title="Creeazǎ un cont" />}
        </AuthFormBase>
      </Form>
    </div>
  );
};
Signup.displayName = "Signup";

export default Signup;
