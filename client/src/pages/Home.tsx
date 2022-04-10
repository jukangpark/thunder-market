import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useRecoilState } from "recoil";
import { isLoggedInState } from "../atoms";
import Banner from "../components/Banner";
import { Wrapper } from "../components/commonStyle/fundamental";
import MiniHeader from "../components/header/MiniHeader";
import Header from "../components/header/Header";
import MainSlide from "../components/slide/MainSlide";
import TodayProduct from "../components/TodayProduct";
import SideMenu from "../components/SideMenu";

const Home = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

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
      <SideMenu />
      <Banner />
      <TodayProduct />
    </Wrapper>
  );
};

export default Home;
