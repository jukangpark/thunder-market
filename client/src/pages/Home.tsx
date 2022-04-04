import styled from "styled-components";
import Banner from "../components/Banner";
import Header from "../components/Header";
import HeaderMenu from "../components/HeaderMenu";
import MainSlide from "../components/MainSlide";
import Slider from "../components/Slider";
import TodayProduct from "../components/TodayProduct";

const Wrapper = styled.div`
  min-width: 1236px;
`
const Home = () => {
  return (
    <Wrapper>
      <HeaderMenu />
      <Header />
      <Slider />
      <MainSlide />
      <Banner />
      <TodayProduct />
    </Wrapper>
  );
};

export default Home;
