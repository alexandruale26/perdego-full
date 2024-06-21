import { promisify } from "util";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createAndSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);

  // TODO: add correct expires in process.env
  // TODO: implement cookie refresh JWT not to force user to log in if is active
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

  const userDiluted = getLimitedUserData(user);

  res.status(statusCode).json({
    status: "success",
    token,
    data: { user: userDiluted },
  });
};

export const signup = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm, phone } = req.body;

  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
    phone,
  });

  createAndSendToken(newUser, 201, res);
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Introdu adresa de e-mail si parola.", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(
      new AppError("Adresa de e-mail sau parola este incorecta.", 401),
    );
  }

  createAndSendToken(user, 200, res);
});

export const updatePassword = catchAsync(async (req, res, next) => {
  const { currentPassword } = req.body;
  const user = await User.findById(req.user.id).select("+password");

  if (!(await user.correctPassword(currentPassword, user.password))) {
    return next(new AppError("Parola curenta este gresita.", 401));
  }

  user.password = currentPassword;
  user.passwordConfirm = currentPassword;

  // TODO: see if should send dilutedUser
  await user.save();
  createAndSendToken(user, 200, res); // Send token
});

// TODO: think if protect should keep all user data
export const protect = catchAsync(async (req, res, next) => {
  // 1. Getting the token and check if it exists
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

  // 2. Decode token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3. Check if user still exists
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

function getLimitedUserData(user) {
  return { _id: user.id, name: user.name };
}
