import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Join from "./pages/Join";
import Upload from "./pages/Upload";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import Shop from "./pages/Shop";
import { useRecoilState } from "recoil";
import { isLoggedInState } from "./atoms";
import New from "./pages/New";
import ProductManage from "./pages/ProductManage";
import Purchases from "./pages/Purchases";
import Product from "./pages/Product";

const Router = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        {isLoggedIn ? (
          <>
            <Route path="upload" element={<Upload />}>
              <Route path="new" element={<New />} />
              <Route path="manage" element={<ProductManage />} />
              <Route path="purchases" element={<Purchases />} />
            </Route>
            <Route path="/shop" element={<Shop />} >
              <Route path="products" element={<Product />} />
            </Route>
          </>
        ) : (
          <>
            <Route path="join" element={<Join />} />
            <Route path="login" element={<Login />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default Router;
