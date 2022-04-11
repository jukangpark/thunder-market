import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.footer`
  width: 100%;
  margin-top: 200px;
  padding-top: 200px;
`;

const LinkSection = styled.div`
  display: flex;
  border-top: 1px solid rgb(229, 229, 229);
  border-bottom: 1px solid rgb(229, 229, 229);

  a {
    text-align: center;
    padding: 0 25px;
    display: block;
    font-size: 13px;
    line-height: 65px;
  }
`;

const InfoSection = styled.div`
  padding-top: 30px;
  display: flex;
  div {
    width: 50%;
  }
  div > h1 {
    font-size: 15px;
    font-weight: bold;
  }
`;

const Footer = () => {
  return (
    <Container>
      <LinkSection>
        <Link to="#">회사소개</Link>
        <Link to="#">이용약관</Link>
        <Link to="#">운영정책</Link>
        <Link to="#">개인정보처리방침</Link>
        <Link to="#">광고운영정책</Link>
        <Link to="#">청소년보호정책</Link>
        <Link to="#">위치기반서비스 이용약관</Link>
      </LinkSection>
      <InfoSection>
        <div>
          <h1>번개장터(주)사업자정보</h1>
        </div>
        <div>
          <h1>고객센터</h1>
        </div>
      </InfoSection>
    </Container>
  );
};

export default Footer;
