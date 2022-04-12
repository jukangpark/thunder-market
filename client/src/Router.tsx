import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Join from "./pages/auth/Join";
import Upload from "./pages/products/Upload";
import Login from "./pages/auth/Login";
import ProductDetail from "./pages/ProductDetail";
import Shop from "./pages/shop/Shop";
import { useRecoilState, useRecoilValue } from "recoil";
import { isLoggedInState } from "./atoms";
import Products from "./pages/products/Products";
import ProductManage from "./pages/products/Manage";
import Purchases from "./pages/products/Purchases";
import Product from "./pages/shop/Product";
import Comment from "./pages/shop/Comment";
import Favorite from "./pages/shop/Favorite";
import Review from "./pages/shop/Review";
import Following from "./pages/shop/Following";
import Follower from "./pages/shop/Follower";
import Sales from "./pages/products/Sales";
import Talk from "./pages/talk/Talk";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

interface IProps {
  isLoggedIn: boolean;
}

const Router = ({ isLoggedIn }: IProps) => {
  // const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  // const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

  // 로그인 처리 구조 자체를 바꿔줘야할듯..

  // useEffect(() => {
  //   const user = cookies.user;
  //   if (user) {
  //     setIsLoggedIn(true);
  //   }
  // }, [isLoggedIn]);

  // console.log(isLoggedIn);
  // 로그인이 되어있는대도 여기서 false 가 나옵니다.
  // 이유가 뭘까요?
  // 그래서 route 가 loggedIn ? 안에 정의되어있는대도 화면이 안나옴 .. 하

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      {isLoggedIn ? (
        <Route path="/products" element={<Products />}>
          <Route path="new" element={<Upload />} />
          <Route path="manage" element={<ProductManage />} />
          <Route path="purchases" element={<Purchases />} />
          <Route path="sales" element={<Sales />} />
        </Route>
      ) : (
        <>
          <Route path="/products" element={<Join />} />
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />
        </>
      )}

      <Route path="/shop/:id" element={<Shop />}>
        <Route path="products" element={<Product />} />
        <Route path="comments" element={<Comment />} />
        <Route path="favorites" element={<Favorite />} />
        <Route path="reviews" element={<Review />} />
        <Route path="followings" element={<Following />} />
        <Route path="followers" element={<Follower />} />
      </Route>
      <Route path="/talk" element={<Talk />} />
    </Routes>
  );
};
// .
export default Router;
