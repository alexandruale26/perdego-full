import { z } from "zod";
import emailSchema from "./validation/emailSchema";

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().trim().min(6, { message: "Introdu parola" }),
});

export const defaultValues = {
  email: "",
  password: "",
};
