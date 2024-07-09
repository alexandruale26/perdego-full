import { z } from "zod";
import emailSchema from "./validation/emailSchema";
import passwordSchema from "./validation/passwordSchema";

export const signupSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    passwordConfirm: z.string().trim().min(1, { message: "Confirmǎ parola" }),
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
