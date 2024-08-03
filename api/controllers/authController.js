import { promisify } from "util";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Token from "../models/Token.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

const cookieOptions = {
  maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "None",
};

const generateAccessToken = (id) =>
  jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

const generateRefreshToken = (id) =>
  jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "2d",
  });

const createAndSendTokens = (id, statusCode, res) => {};

export const signup = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  await User.create({ email, password });

  res.status(201).json({
    status: "success",
    message: "User registered successfully",
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Introdu adresa de email si parola.", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.isValidPassword(password))) {
    return next(
      new AppError("Adresa de email sau parola este incorecta.", 401),
    );
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  await Token.create({
    userId: user.id,
    refreshToken,
  });

  res.cookie("refreshToken", refreshToken, cookieOptions);
  res.json({ status: "success", accessToken });
});

export const updatePassword = catchAsync(async (req, res, next) => {
  const { currentPassword } = req.body;
  const user = await User.findById(req.user.id).select("+password");

  if (!(await user.isValidPassword(currentPassword))) {
    return next(new AppError("Parola curenta este gresita.", 401));
  }

  user.password = currentPassword;

  await user.save();
  createAndSendTokens(user.id, 200, res);
});

// TODO: think if protect should keep all user data
export const protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("Te rugam autentifica-te pentru a primi acces.", 401),
    );
  }

  const decoded = await promisify(jwt.verify)(
    token,
    process.env.ACCESS_TOKEN_SECRET,
  );

  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(new AppError("Utilizatorul nu exista", 401));
  }

  // 4. Check if user changed passwords after token was issued
  // thus forcing the user to log in if using multiple devices
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        "Utilizatorul a modificat recent parola. Te rugam autentifica-te.",
        401,
      ),
    );
  }

  // 5. Grant access to protected route
  req.user = currentUser;
  next();
});

export const refreshToken = catchAsync(async (req, res, next) => {
  const { cookies } = req; // uses refresh token

  if (!cookies?.refreshToken) return next(new AppError("Unauthorized", 401));

  const decoded = await promisify(jwt.verify)(
    cookies.refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
  );

  const currentUser = await User.findById(decoded.id).lean();

  if (!currentUser) {
    return next(new AppError("Utilizatorul nu exista", 401));
  }

  const accessToken = generateAccessToken(currentUser.id);
  res.json({ status: "success", accessToken });
});

export const logout = catchAsync(async (req, res, next) => {
  const { cookies } = req;

  if (cookies?.refreshToken) {
    await Token.findOneAndDelete({
      refreshToken: cookies.refreshToken,
    });

    res.clearCookie("refreshToken", cookieOptions);
  }

  res
    .status(204)
    .json({ status: "success", message: "User logged out successfully" });
});
