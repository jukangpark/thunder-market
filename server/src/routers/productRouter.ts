import express from "express";
import { getProductList, upload } from "../controllers/productController";
import { uploadProduct } from "../middleware/middlewares";

const productRouter = express.Router();

productRouter.route("/showlist").get(getProductList);
productRouter
  .route("/upload")
  .post(uploadProduct.fields([{ name: "productImage", maxCount: 1 }]), upload);

export default productRouter;
