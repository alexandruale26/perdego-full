import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

export const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).select(
    "-__v -passwordChangedAt -updatedAt -slug",
  );

  if (!user) return next(new AppError("Utilizatorul nu exista.", 404));

  res.status(200).json({ status: "success", data: { user } });
});

// TODO: implement these
export const updateMe = catchAsync(async (req, res, next) => {});
export const updateEmail = catchAsync(async (req, res, next) => {});

export const deleteMe = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.user._id);

  if (!user) return next(new AppError("Utilizatorul nu exista", 404));

  res.status(204).json({ status: "success", data: null });
  // TODO: eliminate cookieRefreshAt from tokens collection if user is deleted
  // TODO: delete posts and messages from his side or maybe not...
});
