import Header from "../components/Header";
import HeaderMenu from "../components/HeaderMenu";
import Slider from "../components/Slider";
import TodayProduct from "../components/TodayProduct";

const Home = () => {
  return (
    <>
      <HeaderMenu />
      <Header />
      <Slider />
      <TodayProduct />
    </>
  );
};

export default Home;
