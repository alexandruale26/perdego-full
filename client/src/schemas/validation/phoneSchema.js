import * as z from "zod";

const phoneRegex = /^(?=\+?\s*(?=(?:[^\d\n]*\d){6,15}[^\d\n]*$)[\d\s-]+$)/;

export default z
  .string()
  .regex(phoneRegex, { message: "Introdu un numǎr de telefon valid" })
  .trim();
