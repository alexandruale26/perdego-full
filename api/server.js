import mongoose from "mongoose";
import "./config.js";
import app from "./app.js";

const url = process.env.DB.replace("<PASSWORD>", process.env.DB_PASSWORD);
mongoose
  .connect(url)
  .then(() => console.log("\x1b[32m", "DB connection successful!"));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
