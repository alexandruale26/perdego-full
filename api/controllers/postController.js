import Post from "../models/postModel.js";
import catchAsync from "../utils/catchAsync.js";

export const getMyPosts = catchAsync(async (req, res, next) => {
  res.status(200).json("success");
});

export const createPost = catchAsync(async (req, res, next) => {});
