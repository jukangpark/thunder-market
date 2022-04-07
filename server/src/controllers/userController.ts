import { Express, Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Product from "../models/Product";

export const join = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(req.body);
  const exists = await User.findOne({ email });

  if (exists) {
    return res
      .status(400)
      .send({ message: "해당 이메일을 가진 계정이 존재합니다." })
      .end();
  }

  try {
    await User.create({
      email,
      password,
      products: [],
      comments: [],
      reviews: [],
      followings: [],
      followers: [],
    });
  } catch (error) {
    return res.status(400).send({ message: "에러가 발생했습니다." }).end();
  }

  return res
    .status(200)
    .send({ result: "ok", message: "회원 가입 완료" })
    .end();
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(400)
      .send({ message: "아이디가 존재하지 않습니다." })
      .end();
  }

  const ok = await bcrypt.compare(password, user.password);

  if (!ok) {
    return res
      .status(400)
      .send({ message: "비밀번호가 일치하지 않습니다." })
      .end();
  }

  const token = jwt.sign(
    {
      user_id: user._id,
    },
    process.env.SECRET_KEY || "secret key",
    {
      expiresIn: "10h",
    }
  );
  res.cookie("user", token);
  return res.status(200).send({ result: "ok", message: "로그인 완료" }).end();
};

export const getUserInfo = async (req: Request, res: Response) => {
  const { user_id } = res.locals.user;
  const findedUser = await User.findById(user_id).populate("products"); // db 에서 User 조회

  const {
    email,
    products,
    comments,
    favorites,
    reviews,
    followings,
    followers,
    _id,
  } = findedUser; // user email, products 조회

  const userInfo = {
    email,
    products,
    comments,
    favorites,
    reviews,
    followings,
    followers,
    _id,
  };
  return res.send(userInfo);
};

// 1. 상품
export const getUserProducts = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("products");
  const { products } = user;
  return res.send(products);
};

// 2. 상품 문의
export const getUserComments = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(id);
  const { comments } = user;
  return res.send(comments);
};

// 3. 찜
export const getUserFavorites = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("products");
  const { favorites } = user;
  console.log(favorites);
  return res.send(favorites);
};

// 4. 상점 후기
export const getUserReviews = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(id);
  const { reviews } = user;
  return res.send(reviews);
};

// 5. 팔로잉 (내가 팔로잉 하는 유저)
export const getUserFollowings = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(id);
  const { followings } = user;
  return res.send(followings);
};

// 6. 팔로워 (나를 팔로우 하는 유저)
export const getUserFollowers = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(id);
  const { followers } = user;
  return res.send(followers);
};

// 팔로잉을 누르면 처리할 컨트럴러
export const postUserFollowings = async (req: Request, res: Response) => {
  const { user_id } = res.locals.user;
  const { id } = req.params;

  if (user_id === id) {
    return res.send({ message: "자기 자신을 팔로우 할 수는 없어요" });
  }

  const user = await User.findById(id);
  const clickFollowUser = await User.findById(user_id);

  // clickFollowUser.followings.push(user);
  user.followers.push(clickFollowUser);

  await user.save();
  // await clickFollowUser.save();
  return res.send({ message: "정상적으로 팔로우 되었습니다." });
};

export const postUserFollowers = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(id);

  user.followings.push();

  await user.save();

  return res.send();
};
