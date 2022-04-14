import express from "express";
import {
  changeState,
  getProductDetail,
  getProductList,
  searchProduct,
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

productRouter.route("/search").get(searchProduct);
productRouter.route("/changeState").post(verifyToken, changeState);

productRouter.route("/:id").get(getProductDetail);

productRouter.route("/:id/addFavorites").get(verifyToken, addFavorite);

export default productRouter;
