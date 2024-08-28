import { z } from "zod";
import passwordSchema from "./validation/passwordSchema";

export const changePasswordSchema = z
  .object({
    password: passwordSchema,
    passwordConfirm: z.string().trim().min(1, "Confirmǎ noua parolǎ"),
  })
  .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
    message: "Parolele nu se potrivesc",
    path: ["passwordConfirm"],
  });

export const defaultValues = {
  password: "",
  passwordConfirm: "",
};
