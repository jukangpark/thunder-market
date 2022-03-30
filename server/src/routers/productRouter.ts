import express from "express";
import {
  getProductList,
  uploadProduct,
} from "../controllers/productController";

const productRouter = express.Router();

productRouter.route("/showlist").get(getProductList);
productRouter.route("/upload").post(uploadProduct);

export default productRouter;
