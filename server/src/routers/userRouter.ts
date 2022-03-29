import express from "express";
import { getJoin, join } from "../controllers/userController";

const userRouter = express.Router();

userRouter.route("/join").get(getJoin).post(join);

export default userRouter;