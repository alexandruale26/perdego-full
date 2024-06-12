import express from "express";
import {
  signup,
  login,
  protect,
  updatePassword,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// Protect all routes which requires auth
router.use(protect);

router.patch("/updatePassword", updatePassword);

export default router;
