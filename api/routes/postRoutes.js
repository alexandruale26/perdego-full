import express from "express";
import { protect } from "../controllers/authController.js";
import {
  getMyPosts,
  getAll,
  createPost,
  getPost,
  getPostPhone,
  updatePost,
  deletePost,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:urlSlug", getPost);
router.get("/getPhone/:urlSlug", getPostPhone);

router.use(protect);
router.get("/myPosts", getMyPosts);
router.post("/", createPost);
router.patch("/", updatePost);
router.delete("/:id", deletePost);

export default router;
