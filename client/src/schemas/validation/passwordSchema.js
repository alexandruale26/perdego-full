import { z } from "zod";

const lowercasePattern = /[a-z]/;
const uppercasePattern = /[A-Z]/;
const numberPattern = /\d/;
const disallowedSpecialCharsPattern = /[^\w]/;

const fullPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{12,30}$/;

export default z
  .string()
  .min(12, { message: "Parola trebuie să aibă cel puțin 12 caractere" })
  .max(30, { message: "Parola este prea lungǎ" })
  .refine(
    (val) => {
      return lowercasePattern.test(val);
    },
    {
      message: "Parola trebuie să conținǎ cel puțin o literǎ micǎ",
    },
  )
  .refine((val) => uppercasePattern.test(val), {
    message: "Parola trebuie să conținǎ cel puțin o literǎ mare",
  })
  .refine((val) => numberPattern.test(val), {
    message: "Parola trebuie să conținǎ cel puțin o cifrǎ",
  })
  .refine((val) => !disallowedSpecialCharsPattern.test(val), {
    message: "Nu sunt permise caractere speciale",
  })
  .refine((val) => fullPasswordPattern.test(val), {
    message: "Parola nu indeplinește cerințele",
  });
