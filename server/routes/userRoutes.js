import express from "express";
import {
  checkAuth,
  login,
  signup,
  updateProfile,
} from "../controllers/userController.js";
import upload from "../middlewares/multer.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();
userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.put(
  "/update-profile",
  protectRoute,
  upload.single("profilePic"),
  updateProfile
);

userRouter.get("/check", protectRoute, checkAuth);

export default userRouter;
