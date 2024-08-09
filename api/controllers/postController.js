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
  const post = await Post.findOne({
    urlSlug: req.params.urlSlug,
    active: true,
  }).select("-updatedAt -active -__v");

  if (!post) return next(new AppError("Anuntul nu exista.", 404));

  res.status(200).json({ status: "success", data: { post } });
});

export const createPost = catchAsync(async (req, res, next) => {
  const { type, category, location, title, description, image, name, phone } =
    req.body;

  const newPost = await Post.create({
    type,
    category,
    location,
    title,
    description,
    image,
    name,
    phone,
    postedBy: req.user._id,
  });

  console.log(newPost);

  res.status(201).json({ status: "success", data: newPost });
});

export const deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.id);

  if (!post) return next(new AppError("Anuntul nu exista.", 404));

  res.status(204).json({ status: "success", data: null });
});
