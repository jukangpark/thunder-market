import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Comment from "../models/Comment";

// User 생성
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

  const trimEmail = (email: string) => {
    const index = email.indexOf("@");
    return email.slice(0, index);
  };

  // const index = email.indexOf("@");

  // const username = email.splice(0, index);

  try {
    await User.create({
      email,
      password,
      username: trimEmail(email),
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
    username,
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
    username,
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

// 2. 상점 문의 comment 목록  조회하기
export const getUserComments = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(id).populate({
    path: "comments",
    populate: { path: "owner" },
  });
  const { comments } = user;
  return res.send(comments);
};

// 3. 찜
export const getUserFavorites = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("favorites");
  const { favorites } = user;
  return res.send(favorites);
};

// 4. 상점 후기
export const getUserReviews = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(id).populate({
    path: "reviews",
    populate: { path: "owner" },
  });
  const { reviews } = user;
  return res.send(reviews);
};

// 5. 팔로잉 (내가 팔로잉 하는 유저)
export const getUserFollowings = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("followings");
  return res.send(user.followings);
};

// 6. 팔로워 (나를 팔로우 하는 유저)
export const getUserFollowers = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("followers");

  return res.send(user.followers);
};

// follow를 누르면 처리할 컨트럴러
export const postUserFollowings = async (req: Request, res: Response) => {
  const { user_id } = res.locals.user;
  const { id } = req.params;

  if (user_id === id) {
    return res.send({ message: "자기 자신을 팔로우 할 수는 없어요" });
  }

  const targetUser = await User.findById(id); // 팔로우를 당한 유저

  // follow 를 누른 유저가 이미 targetUser 를 팔로우가 하고 있는 경우.
  if (targetUser.followers.includes(user_id)) {
    return res.send({ message: "해당 유저는 이미 팔로우 되어있습니다." });
  }

  const clickFollowUser = await User.findById(user_id);

  targetUser.followers.push(user_id);
  clickFollowUser.followings.push(id);

  targetUser.save();
  clickFollowUser.save();

  return res.send({ message: "정상적으로 팔로우 되었습니다." });
};

// POST 상점 문의 등록하기.
export const postUserComment = async (req: Request, res: Response) => {
  const { user_id } = res.locals.user;
  const { id } = req.params;
  const { text } = req.body;

  const comment = await Comment.create({
    text,
    owner: user_id,
    category: "userComment",
  });

  const user = await User.findById(id);

  user.comments.push(comment._id);
  user.save();

  return res.send({ message: "정상적으로 상품 문의가 등록되었습니다." });
};

// POST 상점 후기 등록하기.
export const postUserReview = async (req: Request, res: Response) => {
  const { user_id } = res.locals.user;
  const { id } = req.params;
  const { text } = req.body;

  const comment = await Comment.create({
    text,
    owner: user_id,
    category: "userReview",
  });

  const user = await User.findById(id);

  user.reviews.push(comment._id);
  user.save();

  return res.send({ message: "정상적으로 상품 후기가 등록되었습니다." });
};

// 유저 프로필 이미지 업로드
export const postUserProfileImage = async (req: any, res: Response) => {
  const { user_id } = res.locals.user;
  const { profileImage } = req.files;

  const isHeroku = process.env.NODE_ENV === "production";

  const user = await User.findById(user_id);

  (user.profileImageUrl = isHeroku
    ? profileImage[0].location
    : "/" + profileImage[0].path),
    await user.save();

  return res.send({
    message: "정상적으로 프로필 이미지가 업데이트 되었습니다.",
  });
};

export const getUserIntro = (req: Request, res: Response) => {
  const { id } = req.params;
};

// 유저 소개글 업로드
export const postUserIntro = async (req: Request, res: Response) => {
  const { user_id } = res.locals.user;
  const { id } = req.params;

  const { text } = req.body;

  if (user_id !== id) {
    return res.send({ message: "자기 자신의 소개글만 수정할 수 있습니다." });
  }

  const user = await User.findById(user_id);
  user.introduction = text;
  await user.save();

  return res.send({
    message: "정상적으로 소개글이 등록 되었습니다.",
  });
};

export const deleteUserComment = async (req: Request, res: Response) => {
  const { user_id } = res.locals.user;
  const { id } = req.params;
  const { commentid } = req.body;

  if (user_id !== id) {
    return res.send({ message: "댓글 작성자만 삭제할 수 있습니다" });
  }

  await Comment.findByIdAndDelete(commentid);

  return res.send({
    message: "정상적으로 댓글이 삭제되었습니다.",
  });
};
