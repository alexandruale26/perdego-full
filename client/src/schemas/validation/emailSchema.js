import { z } from "zod";

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{1,64}@[a-zA-Z0-9-]{1,253}\.[a-zA-Z]{2,}$/;

export default z
  .string()
  .regex(emailRegex, {
    message: "Introdu o adresǎ de email validǎ",
  })
  .trim();

// TODO: reia de aici
