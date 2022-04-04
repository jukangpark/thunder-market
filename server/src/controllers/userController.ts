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
      expiresIn: "5h",
    }
  );
  res.cookie("user", token);
  return res.status(200).send({ result: "ok", message: "로그인 완료" }).end();
};

export const getUserInfo = async (req: Request, res: Response) => {
  const { user_id } = res.locals.user;
  const findedUser = await User.findById(user_id); // db 에서 User 조회
  const { email, products } = findedUser; // user email, products 조회

  const userInfo = { email, products };
  return res.send(userInfo);
};
