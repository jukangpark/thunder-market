import { Request, Response } from "express";
import Product from "../models/Product";

export const upload = async (req: any, res: Response) => {
  console.log(req.body);
  console.log(req.files);
  const { productImage } = req.files;
  const imageUrl = productImage[0].path;

  const {
    name,
    categories,
    location,
    newProduct,
    change,
    price,
    delivery, // 이거 'on' 으로 나오네?
    description,
    hashtags,
  } = req.body;

  try {
    await Product.create({
      name,
      categories,
      location,
      newProduct,
      change,
      price,
      delivery: true,
      description,
      hashtags,
      imageUrl,
    });
  } catch (error) {
    return res.status(400).redirect("/");
  }

  return res.redirect("/");
};

export const getProductList = (req: Request, res: Response) => {
  return res.send({ message: "조회된 상품이 없습니다." });
};
