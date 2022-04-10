import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Join from "./pages/auth/Join";
import Upload from "./pages/upload/Upload";
import Login from "./pages/auth/Login";
import ProductDetail from "./pages/ProductDetail";
import Shop from "./pages/profile/Shop";
import { useRecoilState } from "recoil";
import { isLoggedInState } from "./atoms";
import New from "./pages/upload/New";
import ProductManage from "./pages/upload/ProductManage";
import Purchases from "./pages/upload/Purchases";
import Product from "./pages/shop/Product";
import Comment from "./pages/shop/Comment";
import Favorite from "./pages/shop/Favorite";
import Review from "./pages/shop/Review";
import Following from "./pages/shop/Following";
import Follower from "./pages/shop/Follower";

const Router = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        {isLoggedIn ? (
          <Route path="/upload" element={<Upload />}>
            <Route path="new" element={<New />} />
            <Route path="manage" element={<ProductManage />} />
            <Route path="purchases" element={<Purchases />} />
          </Route>
        ) : (
          <>
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
      </Routes>
    </>
  );
};

export default Router;
