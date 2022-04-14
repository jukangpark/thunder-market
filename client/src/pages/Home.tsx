import Banner from "../components/Banner";
import { Wrapper } from "../components/commonStyle/fundamental";
import MiniHeader from "../components/header/MiniHeader";
import Header from "../components/header/Header";
import MainSlide from "../components/slide/MainSlide";
import TodayProducts from "../components/TodayProducts";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <Wrapper>
      <MiniHeader />
      <Header />
      <MainSlide />
      <Banner />
      <TodayProducts />
      <Footer />
    </Wrapper>
  );
};

export default Home;
