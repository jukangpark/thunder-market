import { useEffect } from "react";
import { Wrapper } from "../components/fundamental";
import Header from "../components/Header";
import HeaderMenu from "../components/HeaderMenu";

const Shop = () => {
  useEffect(() => {
    fetch("/user/info")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <Wrapper>
      <HeaderMenu />
      <Header />
    </Wrapper>
  );
};

export default Shop;
