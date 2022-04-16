import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Comment from "../models/Comment";

// 회원가입
export const join = async (req: Request, res: Response) => {
  const { email, password } = req.body;

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
    .status(201)
    .send({ result: "ok", message: "회원 가입 완료" })
    .end();
};

// 로그인
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

// id 값으로 유저 정보 조회
export const getUserInfo = async (req: Request, res: Response) => {
  const { id } = req.params;
  let userInfo;
  try {
    userInfo = await User.findById(id).populate("products");
    delete userInfo.password; // 개인정보보호를 위해 유저의 패스워드는 제외
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
  return res.status(200).send(userInfo);
};

// 로그인된 유저 정보 조회
export const getLoggedInUserInfo = async (req: Request, res: Response) => {
  const { user_id } = res.locals.user;
  let userInfo;
  try {
    userInfo = await User.findById(user_id).populate("products");
    delete userInfo.password;
  } catch (error) {
    console.log(error);
    return res.status(400).send({});
  }
  return res.status(200).send(userInfo);
};

//  "/shop/:id/products" 해당 유저가 올린 상품 조회
export const getUserProducts = async (req: Request, res: Response) => {
  const { id } = req.params;
  let products;
  try {
    const user = await User.findById(id).populate("products");
    products = user.products;
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }

  return res.status(200).send(products);
};

// "/shop/:id/comments" 상점 문의 조회
export const getUserComments = async (req: Request, res: Response) => {
  const { id } = req.params;
  let comments;
  try {
    const user = await User.findById(id).populate({
      path: "comments",
      populate: { path: "owner" },
    });
    comments = user.comments;
  } catch (error) {
    console.log(error);
    return res.status(400).send([]);
  }
  return res.status(200).send(comments);
};

// "/shop/:id/favorites" 찜 목록 조회
export const getUserFavorites = async (req: Request, res: Response) => {
  const { id } = req.params;
  let favorites;
  try {
    const user = await User.findById(id).populate("favorites");
    favorites = user.favorites;
  } catch (error) {
    console.log(error);
    return res.status(400).send([]);
  }
  return res.status(200).send(favorites);
};

// "/shop/:id/reviews" 상점 후기 조회
export const getUserReviews = async (req: Request, res: Response) => {
  const { id } = req.params;
  let reviews;
  try {
    const user = await User.findById(id).populate({
      path: "reviews",
      populate: { path: "owner" },
    });
    reviews = user.reviews;
  } catch (error) {
    console.log(error);
    return res.status(400).send([]);
  }

  return res.status(200).send(reviews);
};

// "/shop/:id/followings" 내가 팔로잉 하고 있는 유저 조회
export const getUserFollowings = async (req: Request, res: Response) => {
  const { id } = req.params;
  let followings;
  try {
    const user = await User.findById(id).populate({
      path: "followings",
      populate: { path: "products" },
    });
    followings = user.followings;
  } catch (error) {
    console.log(error);
    return res.status(400).send([]);
  }

  return res.status(200).send(followings);
};

// "/shop/:id/followers" 나를 팔로잉 하고 있는 유저 조회
export const getUserFollowers = async (req: Request, res: Response) => {
  const { id } = req.params;
  let followers;
  try {
    const user = await User.findById(id).populate("followers");
    followers = user.followers;
  } catch (error) {
    return res.status(400).send([]);
  }

  return res.send(followers);
};

// follow를 누르면 처리할 컨트럴러
export const postUserFollowings = async (req: Request, res: Response) => {
  const { user_id } = res.locals.user;
  const { id } = req.params;

  if (user_id === id) {
    return res
      .status(400)
      .send({ message: "자기 자신을 팔로우 할 수는 없어요" });
  }

  const targetUser = await User.findById(id); // 팔로우를 당한 유저
  const clickFollowUser = await User.findById(user_id); // 팔로우를 클릭한 유저

  if (targetUser === null) {
    return res.status(400).send({ message: "해당 유저는 존재하지 않습니다." });
  }

  // follow 를 누른 유저가 이미 targetUser 를 팔로우가 하고 있는 경우.
  if (targetUser.followers.includes(user_id)) {
    const deletedArray = targetUser.followers.filter(
      (x: any) => String(x) !== user_id
    );

    const deletedFollowingArray = clickFollowUser.followers.filter(
      (x: any) => String(x) !== id
    );

    targetUser.followers = deletedArray;
    clickFollowUser.followings = deletedFollowingArray;

    await targetUser.save();
    await clickFollowUser.save();

    return res
      .status(200)
      .send({ message: "해당 유저를 팔로우 취소 하였습니다." });
  }

  targetUser.followers.push(user_id);
  clickFollowUser.followings.push(id);

  await targetUser.save();
  await clickFollowUser.save();

  return res.status(201).send({ message: "정상적으로 팔로우 되었습니다." });
};

// POST 상점 문의 등록하기.
export const postUserComment = async (req: Request, res: Response) => {
  const { user_id } = res.locals.user;
  const { id } = req.params;
  const { text } = req.body;

  let comment;

  try {
    comment = await Comment.create({
      text,
      owner: user_id,
      category: "userComment",
    });
    const user = await User.findById(id);
    if (user === null) {
      return res
        .status(400)
        .send({ message: "해당 유저는 존재하지 않습니다." });
    }

    user.comments.push(comment._id);
    user.save();
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "에러가 발생하였습니다." });
  }

  return res
    .status(201)
    .send({ message: "정상적으로 상품 문의가 등록되었습니다." });
};

// POST 상점 후기 등록하기.
export const postUserReview = async (req: Request, res: Response) => {
  const { user_id } = res.locals.user;
  const { id } = req.params;
  const { text } = req.body;

  try {
    const comment = await Comment.create({
      text,
      owner: user_id,
      category: "userReview",
    });

    const user = await User.findById(id);

    if (user === null) {
      return res
        .status(400)
        .send({ message: "해당 유저가 존재하지 않습니다." });
    }

    user.reviews.push(comment._id);
    user.save();
  } catch (error) {
    return res.status(400).send({ message: "에러가 발생하였습니다." });
  }

  return res
    .status(201)
    .send({ message: "정상적으로 상품 후기가 등록되었습니다." });
};

// 유저 프로필 이미지 업로드
export const postUserProfileImage = async (req: any, res: Response) => {
  const { user_id } = res.locals.user;
  const { profileImage } = req.files;

  const isHeroku = process.env.NODE_ENV === "production";

  try {
    const user = await User.findById(user_id);

    (user.profileImageUrl = isHeroku
      ? profileImage[0].location
      : "/" + profileImage[0].path),
      await user.save();
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }

  return res.redirect(`/shop/${user_id}/products`);
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
  try {
    const user = await User.findById(user_id);

    if (user === null) {
      return res
        .status(400)
        .send({ message: "해당 유저는 존재하지 않습니다." });
    }
    user.introduction = text;
    await user.save();
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "에러가 발생하였습니다." });
  }

  return res.status(201).send({
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

  try {
    await Comment.findByIdAndDelete(commentid);
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "에러가 발생하였습니다." });
  }

  return res.status(200).send({
    message: "정상적으로 댓글이 삭제되었습니다.",
  });
};

// User 의 favorites 목록 삭제하기
export const deleteUserFavorites = async (req: Request, res: Response) => {
  const { user_id } = res.locals.user;
  const { favorites } = req.body;
  const { id } = req.params;

  if (user_id !== id) {
    return res.send({ message: "상점 주인만 삭제할 수 있습니다" });
  }

  const user = await User.findById(user_id);

  if (user === null) {
    return res.send({ message: "해당 유저는 존재하지 않습니다." });
  }

  try {
    const oldArray = [...user.favorites];
    const updatedArray = oldArray.filter((x) => !favorites.includes(String(x)));
    // 차집합 배열
    user.favorites = updatedArray;
    await user.save();
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "에러가 발생하였습니다." });
  }

  return res.status(200).send({ message: "정상적으로 삭제되었습니다." });
};
