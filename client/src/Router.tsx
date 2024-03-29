import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Join from "./pages/auth/Join";
import Upload from "./pages/products/Upload";
import Login from "./pages/auth/Login";
import ProductDetail from "./pages/ProductDetail";
import Shop from "./pages/shop/Shop";
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
import Result from "./pages/search/Result";

const Router = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const isLoggedIn = Boolean(cookies.user);

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
      <Route path="/search" element={<Result />} />
    </Routes>
  );
};
// .
export default Router;
