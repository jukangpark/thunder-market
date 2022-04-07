import express from "express";
import {
  getUserComments,
  getUserFavorites,
  getUserFollowers,
  getUserFollowings,
  getUserInfo,
  getUserProducts,
  getUserReviews,
  join,
  login,
  postUserFollowings,
} from "../controllers/userController";
import { verifyToken } from "../middleware/authorization";

const userRouter = express.Router();

userRouter.route("/join").post(join);
userRouter.route("/login").post(login);
userRouter.route("/info").get(verifyToken, getUserInfo);
userRouter.route("/:id/products").get(getUserProducts);
userRouter.route("/:id/comments").get(getUserComments);
userRouter.route("/:id/favorites").get(getUserFavorites);
userRouter.route("/:id/reviews").get(getUserReviews);

userRouter
  .route("/:id/followings")
  .get(getUserFollowings)
  .post(verifyToken, postUserFollowings); // 팔로잉을 누르면 처리할 컨트럴러.
userRouter.route("/:id/followers").get(getUserFollowers);

// userRouter
//   .route("/comment")
//   .get(verifyToken, getUserComment)
//   .post(postUserComment);

export default userRouter;
