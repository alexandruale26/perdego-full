import crypto from "crypto";

const slugify = (str = undefined, bytes = 8) => {
  const bytesSlug = crypto.randomBytes(bytes).toString("hex");
  if (!str) return bytesSlug;

  const dashedStr = str.split(" ").join("-");
  return `${dashedStr}-${bytesSlug}`;
};

export default slugify;
