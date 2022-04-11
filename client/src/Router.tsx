import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Join from "./pages/auth/Join";
import Upload from "./pages/products/Upload";
import Login from "./pages/auth/Login";
import ProductDetail from "./pages/ProductDetail";
import Shop from "./pages/shop/Shop";
import { useRecoilValue } from "recoil";
import { isLoggedInState } from "./atoms";
import Products from "./pages/products/Products";
import ProductManage from "./pages/products/ProductManage";
import Purchases from "./pages/products/Purchases";
import Product from "./pages/shop/Product";
import Comment from "./pages/shop/Comment";
import Favorite from "./pages/shop/Favorite";
import Review from "./pages/shop/Review";
import Following from "./pages/shop/Following";
import Follower from "./pages/shop/Follower";
import Sales from "./pages/products/Sales";
import Talk from "./pages/talk/Talk";

const Router = () => {
  const isLoggedIn = useRecoilValue(isLoggedInState);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        {isLoggedIn ? (
          // <Route path="/products" element={<Products />}>
          //   <Route path="new" element={<Upload />} />
          //   <Route path="manage" element={<ProductManage />} />
          //   <Route path="purchases" element={<Purchases />} />
          //   <Route path="sales" element={<Sales />} />
          // </Route>
          <></>
        ) : (
          <>
            <Route path="/join" element={<Join />} />
            <Route path="/login" element={<Login />} />
          </>
        )}
        <Route path="/products" element={<Products />}>
          <Route path="new" element={<Upload />} />
          <Route path="manage" element={<ProductManage />} />
          <Route path="purchases" element={<Purchases />} />
          <Route path="sales" element={<Sales />} />
        </Route>

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
    </>
  );
};

export default Router;
