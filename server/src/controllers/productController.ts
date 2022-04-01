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

  let deliveryValue;

  if (delivery === "on") {
    deliveryValue = true; // 배송비 포함
  } else {
    deliveryValue = false; // 배송비 미포함
  }

  try {
    await Product.create({
      name,
      categories,
      location,
      newProduct,
      change,
      price,
      delivery: deliveryValue,
      description,
      hashtags,
      imageUrl,
    });
  } catch (error) {
    return res.status(400).redirect("/");
  }

  return res.redirect("/");
};

export const getProductList = async (req: Request, res: Response) => {
  const list = await Product.find({});

  return res.send(list);
};

export const getProductDetail = async (req: any, res: Response) => {
  const { id } = req.params;
  console.log(id);

  const product = await Product.findById(id);

  return res.send(product);
};
