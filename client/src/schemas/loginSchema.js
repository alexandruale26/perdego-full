import { z } from "zod";
import emailSchema from "./validation/emailSchema";

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, {
    message: "Parola ",
  }),
});

export const defaultValues = {
  email: "",
  password: "",
};
