import { Express, Request, Response } from "express";
import User from "../models/User";

export const join = async (req: Request, res: Response) => {
  const { email, password } = req.body;
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
