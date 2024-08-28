import { z } from "zod";

export default z.string().trim().email("Introdu o adresǎ de email validǎ");
