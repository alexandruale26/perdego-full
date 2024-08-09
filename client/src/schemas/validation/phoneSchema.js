import * as z from "zod";

const phoneRegex = /^(?=\+?(?=(?:[^\d\n]*\d){6,15}[^\d\n]*$)[\d\s-]+$)/;

export default z
  .string()
  .trim()
  .regex(phoneRegex, { message: "Numărul de telefon introdus nu este valid." });
