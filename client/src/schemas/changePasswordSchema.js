import { z } from "zod";
import passwordSchema from "./validation/passwordSchema";

export const changePasswordSchema = z
  .object({
    password: passwordSchema,
    passwordConfirm: z.string().min(1, { message: "Confirmǎ noua parolǎ" }),
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
  password: "",
  passwordConfirm: "",
};
