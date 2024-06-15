import Post from "../models/postModel.js";
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
  const { title, description, location, category, type, postedBy, image } =
    req.body;

  const newPost = await Post.create({
    title,
    description,
    location,
    category,
    type,
    postedBy,
    image,
  });

  res.status(201).json({ statud: "success", data: { post: newPost } });
});
