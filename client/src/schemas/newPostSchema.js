import { z } from "zod";
import nameSchema from "./validation/nameSchema";
import phoneSchema from "./validation/phoneSchema";

export const newPostSchema = z.object({
  // TODO: manage this on backend
  type: z.enum(["pierdute", "gasite"], {
    required_error: "Alege tipul de anunț",
  }),
  category: z.string({ required_error: "Alege o categorie" }),
  location: z.string({ required_error: "Alege o localitate" }),
  title: z
    .string()
    .trim()
    .min(15, { message: "Introdu un titlu" })
    .max(70, { message: "Introdu un titlu mai scurt" }),
  description: z
    .string()
    .trim()
    .min(20, { message: "Introdu o descriere" })
    .max(500, {
      message: "Introdu o descriere mai scurtǎ",
    }),
  image: z.any(),
  name: nameSchema,
  phone: phoneSchema,
});

// location: z.string().refine((value) => locationOptions.includes(value), {
//   message: "Alege o locație",
// }),

export const defaultValues = {
  type: "pierdute",
  category: undefined,
  title: "",
  description: undefined,
  location: undefined,
  image: undefined,
  name: "",
  phone: "",
};
