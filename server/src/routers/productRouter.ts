import express from "express";
import {
  changeState,
  getProductDetail,
  getProductList,
  upload,
} from "../controllers/productController";
import { addFavorite } from "../controllers/productController";
import { verifyToken } from "../middleware/authorization";
import { uploadProductImage } from "../middleware/middlewares";

const productRouter = express.Router();

productRouter.route("/showlist").get(getProductList);
productRouter
  .route("/upload")
  .post(
    verifyToken,
    uploadProductImage.fields([{ name: "productImage", maxCount: 1 }]),
    upload
  );

productRouter.route("/:id").get(getProductDetail);

productRouter.route("/:id/addFavorites").get(verifyToken, addFavorite);

productRouter.route("/changeState").post(verifyToken, changeState);

export default productRouter;
