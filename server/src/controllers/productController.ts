import { Request, Response } from "express";
import Product from "../models/Product";
import User from "../models/User";

//  상품 업로드
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
    console.log(error);
    return res.status(400).redirect("/");
  }
  return res.status(201).redirect("/");
};

// 상품 조회
export const getProductList = async (req: Request, res: Response) => {
  let list;
  try {
    list = await Product.find({});
  } catch (error) {
    return res.status(400).send([]);
  }
  return res.send(list);
};

// Product Detail
export const getProductDetail = async (req: any, res: Response) => {
  const { id } = req.params;
  let product;
  try {
    product = await Product.findById(id).populate({
      path: "owner",
      populate: { path: "products" },
    });

    if (product === null) {
      return res.status(200).send({ message: "해당 상품은 삭제되었습니다." });
    }
    product.meta.views++; // 조회수 저장하기.
    await product.save();
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "에러가 발생하였습니다." });
  }

  return res.status(200).send(product);
};

// 찜 등록
export const addFavorite = async (req: Request, res: Response) => {
  const { user_id } = res.locals.user;
  const { id } = req.params;

  const product = await Product.findById(id);

  if (product === null) {
    return res.status(400).send({ message: "해당 상품은 존재하지 않습니다." });
  }

  if (user_id === String(product.owner)) {
    return res.status(200).send({
      message: "내가 올린 상품은 찜하기 목록에 등록할 수 없습니다.",
    });
  }

  const user = await User.findById(user_id);

  if (user.favorites.includes(id)) {
    const deletedArray = user.favorites.filter((x: any) => String(x) !== id);
    const deletedArrayInProduct = product.meta.favorites.filter(
      (x: any) => String(x) !== user_id
    );
    user.favorites = deletedArray;
    product.meta.favorites = deletedArrayInProduct;

    await user.save();
    await product.save();

    return res.status(200).send({
      message: "상품을 찜하기 목록에서 삭제하였습니다.",
    });
  }

  product.meta.favorites.push(user_id);
  user.favorites.push(id);

  await user.save();
  await product.save();

  return res.send({ message: "정상적으로 찜하기 목록에 등록되었습니다." });
};

// 상품의 상태를 변경해주는 api "개선해야 할 점 DB 에서 데이터를 너무 여러번 찾는다.."
export const changeState = async (req: Request, res: Response) => {
  const { productid, state } = req.body;
  const { user_id } = res.locals.user;

  const loggedInUser = await User.findById(user_id);
  try {
    if (state === "삭제") {
      await Product.findByIdAndDelete(productid);

      const deletedProductArray = loggedInUser.products.filter(
        (product: any) => String(product) !== productid
      );

      loggedInUser.products = deletedProductArray;
      await loggedInUser.save();

      const favoriteUsers = await User.find({ favorites: productid });
      // 상품을 찜하기 목록에 저장한 모든 유저들의 배열을 받는다.

      if (!favoriteUsers)
        return res.send({ message: "상품이 정상적으로 삭제되었습니다." });
      // 상품을 찜하기 목록에 아무도 저장하지 않았다면 여기서 함수를 빠져나갑니다.

      // 상품을 찜하기 목록에 저장한 모든 유저들의 배열에서 상품 objectId값을 없앤다.
      favoriteUsers.map(async (userId) => {
        const user = await User.findById(userId); // 몇번을 db 에서 찾을거냐??! ㅡ ㅅ ㅡ

        const deletedFavoritesArray = user.favorites.filter(
          (x: any) => String(x) !== productid
        );

        user.favorites = deletedFavoritesArray;

        await user.save();
      });
      return res.send({ message: "상품이 정상적으로 삭제되었습니다." }); // 삭제완료
    }
  } catch (error) {
    console.log(error);
    return res.send({ message: "에러가 발생하였습니다" });
  }

  await Product.findByIdAndUpdate(productid, { state });

  return res.send({
    message: `정상적으로 상품의 상태가 ${state}으로 변경되었습니다.`,
  });
};

// 검색 컨트럴러
export const searchProduct = async (req: any, res: Response) => {
  const { keyword } = req.query;
  if (keyword === "") {
    return res.send({
      message: "검색어를 입력해주세요",
    });
  }
  let results;
  if (keyword) {
    try {
      results = await Product.find({
        name: {
          $regex: new RegExp(`${keyword}`, "i"),
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send([]);
    }
  }

  return res.send(results);
};
