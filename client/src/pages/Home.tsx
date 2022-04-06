import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isLoggedInState } from "../atoms";
import Banner from "../components/Banner";
import { Wrapper } from "../components/fundamental";
import Header from "../components/Header";
import HeaderMenu from "../components/HeaderMenu";
import MainSlide from "../components/MainSlide";
import TodayProduct from "../components/TodayProduct";

// const Wrapper = styled.div`
//   min-width: 1236px;
// `;

const Home = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

  useEffect(() => {
    const user = cookies.user;
    if (user) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);
  console.log(isLoggedIn);

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
