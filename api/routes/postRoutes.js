import express from "express";
import { protect } from "../controllers/authController.js";
import { getMyPosts } from "../controllers/postController.js";

const router = express.Router();

router.get("/myPosts", getMyPosts);

router.use(protect);

export default router;
