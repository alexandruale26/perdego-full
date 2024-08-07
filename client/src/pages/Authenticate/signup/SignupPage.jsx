import * as Input from "../../../components/ui/Input.jsx";
import AuthHeader from "../components/AuthHeader.jsx";
import AuthFormBase from "../components/AuthFormBase.jsx";
import AuthButton from "../components/AuthButton.jsx";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, defaultValues } from "../../../schemas/signupSchema.js";
import signupFieldsData from "./signupFieldsData.js";
import axios from "axios";
// import { signup } from "../../../services/userApi.js";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  InputErrorMessage,
} from "../../../components/ui/Form.jsx";

const SignupPage = () => {
  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = ({ email, password }) => {
    const processRequest = async () => {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/signup",
        { email, password },
      );

      console.log(response);
    };

    processRequest();
  };

  return (
    <div>
      <AuthHeader defaultTab="/cont-nou" />

      <Form {...form}>
        <AuthFormBase handleSubmit={form.handleSubmit(onSubmit)}>
          <>
            {signupFieldsData.map((item) => (
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
SignupPage.displayName = "Signup";

export default SignupPage;
