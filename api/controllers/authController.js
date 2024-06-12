import { promisify } from "util";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/userModel.js";

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createAndSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  // TODO: add correct expires in process.env
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };

  // Only in development mode. In Postman we use only HTTP
  // "cookie.secure = true" means the cookie will be send only through HTTPS
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  // remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: { user },
  });
};

// eslint-disable-next-line import/prefer-default-export
export const signup = async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;

  try {
    const newUser = await User.create({
      name,
      email,
      password,
      passwordConfirm,
    });

    createAndSendToken(newUser, 201, res);
  } catch (error) {
    next(error);
  }
};
