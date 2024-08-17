import { z } from "zod";
import nameSchema from "./validation/nameSchema";
import phoneSchema from "./validation/phoneSchema";

// TODO: manage this on backend too
export const newPostSchema = z
  .object({
    type: z.enum(["pierdute", "gasite"], {
      required_error: "Alege tipul de anunț",
    }),
    category: z.string({ required_error: "Alege o categorie" }),
    location: z.string({ required_error: "Alege o localitate" }),
    reward: z.boolean(),
    sendToAuthorities: z.boolean(),
    authorities: z.string().trim().nullable(),
    title: z
      .string()
      .trim()
      .min(15, { message: "Introdu un titlu mai lung" })
      .max(70, { message: "Introdu un titlu mai scurt" }),
    description: z
      .string()
      .trim()
      .min(20, { message: "Introdu o descriere mai lungǎ" })
      .max(500, {
        message: "Introdu o descriere mai scurtǎ",
      }),
    image: z.any(),
    name: nameSchema,
    phone: phoneSchema,
  })
  .superRefine(({ sendToAuthorities, authorities }, ctx) => {
    if (sendToAuthorities) {
      if (authorities.length < 5) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Introdu un nume mai lung",
          path: ["authorities"],
        });
      } else if (authorities.length > 70) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Introdu un nume mai scurt",
          path: ["authorities"],
        });
      }
    }
  });

export const defaultValues = {
  type: "pierdute",
  category: undefined,
  location: undefined,
  reward: false,
  sendToAuthorities: false,
  authorities: "",
  title: "",
  description: "",
  image: undefined,
  name: "",
  phone: "",
};
