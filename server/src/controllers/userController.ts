import { Express, Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
  } = findedUser; // user email, products 조회

  const userInfo = {
    email,
    products,
    comments,
    favorites,
    reviews,
    followings,
    followers,
  };
  return res.send(userInfo);
};

export const getUserComment = async (req: Request, res: Response) => {
  const { user_id } = res.locals.user;
  // 현재 로그인된 유저의 comments 들을 가져와서 보여줌.

  return res.send([]);
};

export const postUserComment = (req: Request, res: Response) => {
  const { id } = req.params;
  return res.send();
};

export const getUserProducts = (req: Request, res: Response) => {
  const { id } = req.params;
  return res.send();
};

export const getUserComments = (req: Request, res: Response) => {
  const { id } = req.params;
  return res.send();
};

export const getUserFavorites = (req: Request, res: Response) => {
  const { id } = req.params;
  return res.send();
};

export const getUserReviews = (req: Request, res: Response) => {
  const { id } = req.params;
  return res.send();
};

export const getUserFollowings = (req: Request, res: Response) => {
  const { id } = req.params;
  return res.send();
};

export const getUserFollowers = (req: Request, res: Response) => {
  const { id } = req.params;
  return res.send();
};
