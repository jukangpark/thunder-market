import { useEffect } from "react";
import Header from "../components/Header";
import HeaderMenu from "../components/HeaderMenu";
import Slider from "../components/Slider";

const Home = () => {
  useEffect(() => {
    fetch("/product/showlist")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <>
      <HeaderMenu />
      <Header />
      <Slider />
    </>
  );
};

export default Home;
