import { Request, Response } from "express";
import mongoose from "mongoose";
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

  product.meta.views++; // 조회수 저장하기.
  product.save();

  return res.send(product);
};

export const addFavorite = async (req: Request, res: Response) => {
  const { user_id } = res.locals.user;
  const { id } = req.params;

  const product = await Product.findById(id);

  if (user_id === String(product.owner)) {
    return res.send({
      message: "내가 올린 상품은 찜하기 목록에 등록할 수 없습니다.",
    });
  }
  const user = await User.findById(user_id);

  if (user.favorites.includes(id)) {
    return res.send({
      message: "해당 상품은 이미 찜하기 목록에 등록되어있습니다.",
    });
  }

  product.meta.favorites.push(id);
  user.favorites.push(id);

  await user.save();
  await product.save();

  return res.send({ message: "정상적으로 찜하기 목록에 등록되었습니다." });
};

// 상품의 상태를 변경해주는 컨트럴러 삭제도 가능함.
export const changeState = async (req: Request, res: Response) => {
  const { productid, state } = req.body;

  console.log(productid, state);

  const { user_id } = res.locals.user;
  const loggedInUser = await User.findById(user_id);

  if (state === "삭제") {
    await Product.findByIdAndDelete(productid);

    // 유저가 올린 상품 목록에서 삭제해줘야하니까.

    // loggedInUser.products = loggedInUser.products.filter((product: any) => {
    //   console.log(String(product), productid); // false 여기서 두번 나옴.. 왜그런거지???
    //   // 둘다 스트링 자료형이고 둘 다 같은거 아닙니까?
    // });

    // await loggedInUser.update(); // 여기서 에러 발생.
    return res.send({ message: "상품이 정상적으로 삭제되었습니다." });
  } // 삭제완료

  // const deleteObjectId = new mongoose.Types.ObjectId(state);
  // const index = user.products.indexOf(deleteObjectId); // 이건 string 이라서 맞는게 없네요..
  // user.products.splice(index, 1);

  // const favoriteUsers = await User.find({ favorites: productid });
  // console.log("이상품을 좋아요 누른 유저", favoriteUsers);
  // user.products.
  // user 의 favorites 배열에 들어간 상품 objectId값도 삭제해줘야함.

  return res.send({ message: "정상적으로 상품의 상태가 변경되었습니다." });
};
