import Post from "../models/Post.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

export const getMyPosts = catchAsync(async (req, res, next) => {
  res.status(200).json("success");
});

export const getAll = catchAsync(async (req, res, next) => {
  const posts = await Post.find({ active: true }).select(
    "-active -postedBy -_id -updatedAt -idSlug -__v",
  );

  res
    .status(200)
    .json({ status: "success", results: posts.length, data: { posts } });
});

export const getPost = catchAsync(async (req, res, next) => {
  console.log(req.params);

  const post = await Post.findOne({
    urlSlug: req.params.urlSlug,
  }).select("-updatedAt -_id -__v");

  if (!post) return next(new AppError("Anuntul nu exista.", 404));

  res.status(200).json({ status: "success", data: post });
});

export const createPost = catchAsync(async (req, res, next) => {
  const newPost = await Post.create({
    ...req.body,
    postedBy: req.user._id,
  });

  res.status(201).json({ status: "success", data: newPost });
});

export const updatePost = catchAsync(async (req, res, next) => {});

export const deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.id);

  if (!post) return next(new AppError("Anuntul nu exista.", 404));

  res.status(204).json({ status: "success", data: null });
});
