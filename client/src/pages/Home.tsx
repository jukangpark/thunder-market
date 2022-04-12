import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useRecoilState } from "recoil";
import { isLoggedInState } from "../atoms";
import Banner from "../components/Banner";
import { Wrapper } from "../components/commonStyle/fundamental";
import MiniHeader from "../components/header/MiniHeader";
import Header from "../components/header/Header";
import MainSlide from "../components/slide/MainSlide";
import TodayProducts from "../components/TodayProducts";
import Footer from "../components/Footer";

const Home = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

  // 로그인 처리 구조 자체를 바꿔줘야할듯..

  useEffect(() => {
    const user = cookies.user;
    if (user) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

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
