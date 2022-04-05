import express from "express";
import {
  getProductDetail,
  getProductList,
  upload,
} from "../controllers/productController";
import { uploadProductImage } from "../middleware/middlewares";

const productRouter = express.Router();

productRouter.route("/showlist").get(getProductList);
productRouter
  .route("/upload")
  .post(
    uploadProductImage.fields([{ name: "productImage", maxCount: 1 }]),
    upload
  );

productRouter.route("/:id").get(getProductDetail);

export default productRouter;
