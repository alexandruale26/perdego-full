import * as Input from "../../../components/ui/Input";
import AuthHeader from "../components/AuthHeader";
import AuthFormBase from "../components/AuthFormBase";
import AuthButton from "../components/AuthButton";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, defaultValues } from "../../../schemas/signupSchema.js";
import signup from "./js/data.js";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  InputErrorMessage,
} from "../../../components/ui/Form";

const Signup = () => {
  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <AuthHeader defaultTab="/cont-nou" />

      <Form {...form}>
        <AuthFormBase handleSubmit={form.handleSubmit(onSubmit)}>
          <>
            {signup.map((item) => (
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

          <AuthButton title="Creeazǎ un cont" />
        </AuthFormBase>
      </Form>
    </div>
  );
};
Signup.displayName = "Signup";

export default Signup;
