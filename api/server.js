import mongoose from "mongoose";
import app from "./app.js";

mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => console.log("\x1b[32m", "DB connection successful!"));

const port = process.env.PORT || 3500;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
