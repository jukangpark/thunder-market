import express from "express";
import { join, login } from "../controllers/userController";

const userRouter = express.Router();

userRouter.route("/join").post(join);
userRouter.route("/login").post(login);

export default userRouter;
