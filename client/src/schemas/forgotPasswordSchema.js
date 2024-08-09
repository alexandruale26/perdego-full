import { z } from "zod";
import emailSchema from "./validation/emailSchema";

export const forgotPasswordSchema = z.object({ email: emailSchema });
export const defaultValues = { email: "" };
