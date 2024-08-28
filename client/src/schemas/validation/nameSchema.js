import * as z from "zod";

const nameRegex = /^(?=.*[a-zA-Z].*[a-zA-Z])[a-zA-Z0-9.\-_ ]+$/;

export default z
  .string()
  .trim()
  .min(3, "Introdu numele tǎu")
  .max(32, "Introdu un nume mai scurt")
  .regex(nameRegex, "Introdu numele fǎrǎ caractere speciale");
