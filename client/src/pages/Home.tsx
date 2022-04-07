import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useRecoilState } from "recoil";
import { isLoggedInState } from "../atoms";
import Banner from "../components/Banner";
import { Wrapper } from "../components/StyleTS/fundamental";
import Header from "../components/Header";
import HeaderMenu from "../components/HeaderMenu";
import MainSlide from "../components/MainSlide";
import TodayProduct from "../components/TodayProduct";

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
      <HeaderMenu />
      <Header />
      <MainSlide />
      <Banner />
      <TodayProduct />
    </Wrapper>
  );
};

export default Home;
