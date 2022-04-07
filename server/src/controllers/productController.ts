import { Request, Response } from "express";
import Product from "../models/Product";
import User from "../models/User";

export const upload = async (req: any, res: Response) => {
  const {
    user: { user_id: _id },
  } = res.locals;

  const { productImage } = req.files;

  const isHeroku = process.env.NODE_ENV === "production";

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
    const product = await Product.create({
      name,
      categories,
      location,
      newProduct,
      change,
      price,
      delivery: deliveryValue,
      description,
      hashtags,
      imageUrl: isHeroku
        ? productImage[0].location
        : "/" + productImage[0].path,
      owner: _id,
    });
    const user = await User.findById(_id);
    user.products.push(product._id);
    await user.save();
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
  const product = await Product.findById(id).populate("owner");

  return res.send(product);
};

export const addFavorite = async (req: Request, res: Response) => {
  const { user_id } = res.locals.user;
  const { id } = req.params;
  const user = await User.findById(user_id);

  const product = await Product.findById(id);
  user.favorites.push(product);

  await user.save();

  return res.send({ message: "정상적으로 찜하기 목록에 등록되었습니다." });
};
