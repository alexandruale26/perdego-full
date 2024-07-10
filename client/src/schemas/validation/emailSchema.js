import { z } from "zod";

export default z
  .string()
  .trim()
  .email({ message: "Introdu o adresǎ de email validǎ" });
