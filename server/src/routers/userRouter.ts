import express from "express";
import {
  getUserComment,
  getUserComments,
  getUserFavorites,
  getUserFollowers,
  getUserInfo,
  getUserProducts,
  getUserReviews,
  join,
  login,
  postUserComment,
} from "../controllers/userController";
import { verifyToken } from "../middleware/authorization";

const userRouter = express.Router();

userRouter.route("/join").post(join);
userRouter.route("/login").post(login);
userRouter.route("/info").get(verifyToken, getUserInfo);
userRouter.route("/products").get(getUserProducts);
userRouter.route("/comments").get(getUserComments);
userRouter.route("/favorites").get(getUserFavorites);
userRouter.route("/reviews").get(getUserReviews);
userRouter.route("/followings").get(getUserFavorites);
userRouter.route("/followers").get(getUserFollowers);

userRouter
  .route("/comment")
  .get(verifyToken, getUserComment)
  .post(postUserComment);

export default userRouter;
