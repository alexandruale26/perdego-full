import { z } from "zod";
import emailSchema from "./validation/emailSchema";
import passwordSchema from "./validation/passwordSchema";
import phoneSchema from "./validation/phoneSchema";
import nameSchema from "./validation/nameSchema";

const locationOptions = ["ale"];

export const signupAccountSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    passwordConfirm: z.string().min(1, { message: "Confirmǎ parola" }).trim(),
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

export const signupProfileSchema = z.object({
  phone: phoneSchema,
  name: nameSchema,
  location: z.string().refine((value) => locationOptions.includes(value), {
    message: "Alege o locație",
  }),
});

export const defaultValues = {
  email: "",
  password: "",
  phone: "",
  passwordConfirm: "",
  name: "",
  location: "",
};
