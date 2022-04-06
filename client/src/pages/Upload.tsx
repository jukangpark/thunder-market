import { Helmet, HelmetProvider } from "react-helmet-async";

import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import { Wrapper } from "../components/fundamental";
import Header from "../components/Header";
import HeaderMenu from "../components/HeaderMenu";

const NestedLink = styled.div`
  margin: 0 auto;
  width: 1023px;
  display: flex;
  line-height: 65px;
  text-align: center;

  a {
    width: 100px;
    margin-right: 30px;
    font-size: 13px;
    transition-duration: 400ms;
  }
  a:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;

const Upload = () => {
  return (
    <Wrapper>
      <HelmetProvider>
        <Helmet>
          <title>Thunder Market | upload</title>
        </Helmet>
      </HelmetProvider>
      <HeaderMenu />
      <Header />
      <NestedLink>
        <Link to="new">상품등록</Link>
        <Link to="manage">상품관리</Link>
        <Link to="purchases">구매/판매 내역</Link>
      </NestedLink>
      <Outlet />
    </Wrapper>
  );
};

export default Upload;
