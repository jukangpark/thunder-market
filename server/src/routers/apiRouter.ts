import express from "express";
import { connect } from "../controllers/apiController";

const apiRouter = express.Router();

apiRouter.get("/connect", connect);

export default apiRouter;