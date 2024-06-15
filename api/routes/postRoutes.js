import express from "express";
import { protect } from "../controllers/authController.js";
import {
  getMyPosts,
  getAll,
  createPost,
  getPost,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:urlSlug", getPost);

router.use(protect);
router.get("/myPosts", getMyPosts);
router.post("/", createPost);

export default router;
