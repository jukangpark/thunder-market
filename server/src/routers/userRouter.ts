import express from "express";
import {
  deleteUserComment,
  deleteUserFavorites,
  getLoggedInUserInfo,
  getUserComments,
  getUserFavorites,
  getUserFollowers,
  getUserFollowings,
  getUserInfo,
  getUserProducts,
  getUserReviews,
  join,
  login,
  postUserComment,
  postUserFollowings,
  postUserIntro,
  postUserProfileImage,
  postUserReview,
} from "../controllers/userController";
import { verifyToken } from "../middleware/authorization";
import { uploadProfileImage } from "../middleware/middlewares";

const userRouter = express.Router();

userRouter.route("/join").post(join);
userRouter.route("/login").post(login);
userRouter.route("/loggedIn/info").get(verifyToken, getLoggedInUserInfo);
userRouter.route("/:id/info").get(getUserInfo);

userRouter.route("/:id/products").get(getUserProducts);
userRouter
  .route("/:id/comments")
  .get(getUserComments)
  .post(verifyToken, postUserComment)
  .delete(verifyToken, deleteUserComment);

userRouter
  .route("/:id/favorites")
  .get(getUserFavorites)
  .post(verifyToken, deleteUserFavorites);

userRouter
  .route("/:id/reviews")
  .get(getUserReviews)
  .post(verifyToken, postUserReview);

userRouter
  .route("/:id/followings")
  .get(getUserFollowings)
  .post(verifyToken, postUserFollowings); // 팔로잉을 누르면 처리할 컨트럴러.

userRouter.route("/:id/followers").get(getUserFollowers);

userRouter
  .route("/profile/image")
  .post(
    verifyToken,
    uploadProfileImage.fields([{ name: "profileImage", maxCount: 1 }]),
    postUserProfileImage
  );

userRouter.route("/:id/introduction").post(verifyToken, postUserIntro);

export default userRouter;
