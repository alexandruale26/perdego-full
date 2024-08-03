import express from "express";
import {
  signup,
  login,
  logout,
  protect,
  refreshToken,
  updatePassword,
} from "../controllers/authController.js";
import { deleteMe, getMe, getUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);

// Protect all routes which requires auth
router.use(protect);

router.get("/profile", getMe, getUser);
router.patch("/updatePassword", updatePassword);
router.delete("/deleteMe", deleteMe);

export default router;
