import * as z from "zod";

const nameRegex = /^(?=.*[a-zA-Z].*[a-zA-Z])[a-zA-Z0-9.\-_ ]+$/;

export default z
  .string()
  .min(2, { message: "Introdu numele tǎu" })
  .max(32, { message: "Introdu un nume mai scurt" })
  .regex(nameRegex, {
    message: "Introdu numele fǎrǎ caractere speciale",
  })
  .trim();
