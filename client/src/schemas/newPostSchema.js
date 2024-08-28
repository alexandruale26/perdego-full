import { z } from "zod";
import nameSchema from "./validation/nameSchema";
import phoneSchema from "./validation/phoneSchema";

// TODO: manage this on backend too
export const newPostSchema = z
  .object({
    type: z.enum(["pierdute", "gasite"], {
      required_error: "Alege tipul de anunț",
    }),
    category: z.string().optional(),
    location: z.string().optional(),
    reward: z.boolean(),
    sendToAuthorities: z.boolean(),
    authorities: z.string().trim(),
    title: z
      .string()
      .trim()
      .min(15, "Introdu un titlu mai lung")
      .max(70, "Introdu un titlu mai scurt"),
    description: z
      .string()
      .trim()
      .min(20, "Introdu o descriere mai lungǎ")
      .max(500, "Introdu o descriere mai scurtǎ"),
    image: z.any(),
    name: nameSchema,
    phone: phoneSchema,
  })
  .superRefine((values, ctx) => {
    if (!values.category) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Alege o categorie",
        path: ["category"],
      });
    }
    if (!values.location) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Alege o localitate",
        path: ["location"],
      });
    }

    if (values.sendToAuthorities) {
      if (values.authorities.length < 5) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Introdu un nume mai lung",
          path: ["authorities"],
        });
      } else if (values.authorities.length > 70) {
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
  category: "",
  location: "",
  reward: false,
  sendToAuthorities: false,
  authorities: "",
  title: "",
  description: "",
  image: undefined,
  name: "",
  phone: "",
};
