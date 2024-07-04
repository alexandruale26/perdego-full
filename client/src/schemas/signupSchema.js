import { z } from "zod";
import emailSchema from "./validation/emailSchema";
import passwordSchema from "./validation/passwordSchema";

//TODO: Create Location schema as it should be. use it elsewhere

export const signupSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    passwordConfirm: z.string().min(1, { message: "Confirmǎ parola" }).trim(),
    // location: z.string().refine((value) => locationOptions.includes(value), {
    //   message: "Alege o locație",
    // }),
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (password !== passwordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Parolele nu se potrivesc",
        path: ["passwordConfirm"],
      });
    }
  });

export const defaultValues = {
  email: "",
  password: "",
  passwordConfirm: "",
};
