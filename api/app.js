import "./config/dotenvConfig.js";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";
import AppError from "./utils/appError.js";

import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js";
import globalErrorHandler from "./controllers/errorController.js";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors(corsOptions));
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

app.all("*", (req, res, next) => {
  const err = new AppError(
    `Can't find ${req.originalUrl} on this server.`,
    404,
  );

  // Next(param) -> receives just one param and assumes that is an error param
  // will skip every middleware and pass the param to the ERROR HANDLING MIDDLEWARE
  next(err);
});

// ERROR HANDLING MIDDLEWARE
// Automatically recognize pattern -> (err, req, res, next)
app.use(globalErrorHandler);

export default app;
