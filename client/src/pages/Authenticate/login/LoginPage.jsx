import { Link, useNavigate, useLocation } from "react-router-dom";
import * as Input from "../../../components/ui/Input";
import AuthHeader from "../components/AuthHeader";
import AuthFormBase from "../components/AuthFormBase";
import AuthButton from "../components/AuthButton";

import { setApiAccessToken } from "../../../services/api.js";
import login from "../../../services/login.js";
import { setAuthCookie } from "../../../utils/authCookie";

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
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async (credentials) => {
    const response = await login(credentials);

    if (response.status !== "success") {
      return console.log(response); // user notification
    }

    setApiAccessToken(response.accessToken);
    setAuthCookie();
    navigate(searchParams.get("redirect") ?? "/", { replace: true });
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
