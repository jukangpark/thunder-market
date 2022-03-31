import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Join from "./pages/Join";
import Upload from "./pages/Upload";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<Join />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </>
  );
};

export default Router;
