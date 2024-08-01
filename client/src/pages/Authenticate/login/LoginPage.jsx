import { Link } from "react-router-dom";
import * as Input from "../../../components/ui/Input.jsx";
import AuthHeader from "../components/AuthHeader.jsx";
import AuthFormBase from "../components/AuthFormBase.jsx";
import AuthButton from "../components/AuthButton.jsx";
import axios from "axios";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, defaultValues } from "../../../schemas/loginSchema.js";
import loginFieldsData from "./loginFieldsData.js";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  InputErrorMessage,
} from "../../../components/ui/Form.jsx";

const LoginPage = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = (credentials) => {
    const processRequest = async () => {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/login",
        credentials,
      );

      console.log(response);
    };

    processRequest();
  };

  return (
    <div>
      <AuthHeader defaultTab="/autentificare" />

      <Form {...form}>
        <AuthFormBase handleSubmit={form.handleSubmit(onSubmit)}>
          {loginFieldsData.map((item) => (
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

          <span className="text-sm text-start ml-2 mt-4">
            <strong className="font-semibold hover:border-b-2 hover:border-secondary transition-colors">
              <Link to="/am-uitat-parola">Ai uitat parola?</Link>
            </strong>
          </span>

          <AuthButton title="Intrǎ în cont" />
        </AuthFormBase>
      </Form>
    </div>
  );
};
LoginPage.displayName = "Login";

export default LoginPage;
