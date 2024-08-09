import { promisify } from "util";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Token from "../models/Token.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

// TODO - implement tight ip restrictions to auth routes
const cookieOptions = {
  maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
  httpOnly: true,
  secure: true,
  sameSite: "None",
};

const generateAccessToken = (id) =>
  jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "900s",
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

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  await Token.create({
    userId: user._id,
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
  // console.log("XXXXX refresh token in request", req.cookies);

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

  // Check if user changed passwords after token was issued
  // thus forcing the user to log in if using multiple devices
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        "Utilizatorul a modificat recent parola. Te rugam autentifica-te.",
        401,
      ),
    );
  }
  // Grant access to protected route
  req.user = currentUser;
  next();
});

export const refreshToken = catchAsync(async (req, res, next) => {
  const { cookies } = req;

  if (!cookies?.refreshToken) return next(new AppError("Unauthorized", 401));

  const dbRefreshToken = await Token.findOne({
    refreshToken: cookies.refreshToken,
  }).lean();

  if (!dbRefreshToken) return next(new AppError("Unauthorized", 401));

  const decoded = await promisify(jwt.verify)(
    dbRefreshToken.refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
  );

  const currentUser = await User.findById(decoded.id).lean();

  if (!currentUser) {
    return next(new AppError("Utilizatorul nu exista", 401));
  }

  // TODO: Peste tot foloseste ._id nu .id
  const accessToken = generateAccessToken(currentUser._id);
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
