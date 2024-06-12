import express from "express";
import morgan from "morgan";

import userRouter from "./routes/userRoutes.js";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json({ limit: "10kb" }));

app.use("/api/v1/users", userRouter);

export default app;
