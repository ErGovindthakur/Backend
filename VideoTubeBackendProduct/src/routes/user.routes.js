import express from "express";
import {
  changeCurrentPassword,
  getCurrentUser,
  getUserChannelProfile,
  getWatchHistory,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

// secure route
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refreshToken").post(refreshAccessToken);
router.route("changePassword").post(verifyJWT, changeCurrentPassword);
router.route("/getCurrentUser").get(verifyJWT, getCurrentUser);
router.route("updateAccountDetails").patch(verifyJWT, updateAccountDetails);
router
  .route("/updateAvatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);
router
  .route("/updateCoverImage")
  .patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);
router.route("/channelProfile/:username").get(verifyJWT, getUserChannelProfile);
router.route("/watchHistory").get(verifyJWT, getWatchHistory);
export default router;
