import express from "express";
import { join } from "../controllers/userController";

const userRouter = express.Router();

userRouter.route("/join").post(join);

export default userRouter;
