import { z } from "zod";
import emailSchema from "./validation/emailSchema";

export const loginSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .min(4, {
      message: "Introdu parola",
    })
    .trim(),
});

export const defaultValues = {
  email: "",
  password: "",
};
