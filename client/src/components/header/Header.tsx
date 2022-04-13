import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IUser } from "../../interface";
import SideMenu from "../SideMenu";

const Container = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.bgColor};
  border-bottom: 1px solid rgb(238, 238, 238);
  padding-top: 35px;
  position: sticky;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  top: 0;
  left: 0;
  z-index: 10;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  height: 40px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
`;
const InputWrapper = styled.div`
  width: 460px;
  height: 40px;
  border: 2px solid rgb(247, 47, 51);
  box-sizing: border-box;
  position: relative;
`;
const InputBg = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 15px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
`;
const MainInput = styled.input`
  width: 410px;
  outline: none;
  border: none;
  color: ${(props) => props.theme.btnColor};
  background: ${(props) => props.theme.bgColor};
  appearance: none;
  font-weight: 600;
  -webkit-box-flex: 1;
  flex-grow: 1;
  letter-spacing: -0.5px;
`;
const MainImg = styled.img`
  width: 136px;
  margin-right: 100px;
  display: flex;
  align-items: center;
  -webkit-box-align: center;
`;
const MenuWrapper = styled.div`
  width: 328px;
  height: 26px;
  flex-direction: row-reverse;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-flex: 1;
  flex-grow: 1;
  line-height: 1.15;
  > a {
    height: 26px;
    margin-left: 30px;
    text-decoration: none;
    background-color: transparent;
  }
`;
const ShopLink = styled.div`
  height: 24px;
  margin-left: 30px;
  text-decoration: none;
  background-color: transparent;
  display: inline-block;
`;
const TalkBtn = styled.button`
  height: 24px;
  margin-left: 30px;
  cursor: pointer;
  font-size: 100%;
`;
const HeaderMenu = styled.div`
  width: 1024px;
  height: 70px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
`;
const MenuHamberg = styled.div`
  width: 20px;
  height: 16px;
  margin-right: 20px;
  vertical-align: bottom;
  align-items: baseline;
  span {
    width: 20px;
    height: 2px;
    display: grid;
    margin-right: 20px;
    margin-bottom: 6px;
    background: ${(props) => props.theme.textColor};
  }
`;
const MenuLink = styled.a`
  height: 21px;
  box-sizing: border-box;
  line-height: 1.5;
  margin: 10px;
  -webkit-box-align: baseline;
  align-items: baseline;
  display: flex;
`;
const MenuB = styled.b`
  height: 21px;
  font-size: 14px;
  color: ${(props) => props.theme.textColor};
  font-weight: bolder;
`;

const Header = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const isLoggedIn = Boolean(cookies.user);

  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    if (cookies.user) {
      fetch("/user/info")
        .then((res) => res.json())
        .then((data) => setUser(data));
    }
  }, []);

  return (
    <Container>
      <Wrapper>
        <HeaderWrapper>
          <Link to={"/"}>
            <MainImg src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMzYiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAxMzYgNDAiPgogICAgPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBmaWxsPSIjRDgwQzE4Ij4KICAgICAgICAgICAgPHBhdGggZD0iTTIxLjc1MSAxNC44TDUuOTY3IDMxLjc1NmMtLjEwMi4xMS0uMjg2LjAyNS0uMjY3LS4xMjVsMS43Ni0xNC4zNjNILjE1NmMtLjEzNiAwLS4yMDctLjE2Mi0uMTE0LS4yNjJMMTUuODI2LjA1Yy4xMDMtLjExLjI4Ni0uMDI1LjI2OC4xMjVsLTEuNzYgMTQuMzYzaDcuMzAzYy4xMzYgMCAuMjA3LjE2Mi4xMTQuMjYyTTc5LjQgMi41NTVWMjkuNjVoLTQuMDNWMTYuMTMyaC0yLjZ2MTMuMDA0SDY4LjhWMi43MDVoMy45NzF2OS4zMjRoMi42VjIuNTU1aDQuMDN6TTk0LjcgMTguNDU4Yy43NTcgMCAxLjQ5My4wMDUgMi4yMS4wMTUuNzE0LjAxMiAxLjM0NC4wMzYgMS44OS4wNzUgMi4yNTcuMTM4IDQuMDA3LjY1IDUuMjQ2IDEuNTMzIDEuMjQuODgyIDEuODYgMi4yMDcgMS44NiAzLjk3M3MtLjYyIDMuMDg2LTEuODYgMy45NmMtMS4yNC44NzItMi45OSAxLjM4OC01LjI0NyAxLjU0OC0uNTI1LjAzOS0xLjE0NS4wNjMtMS44Ni4wNzMtLjcxNy4wMS0xLjQ1OC4wMTQtMi4yMjMuMDE0LS43NjcgMC0xLjUwOC0uMDA1LTIuMjI0LS4wMTQtLjcxNS0uMDEtMS4zMzUtLjAzNC0xLjg2LS4wNzMtMi4yNTgtLjE2LTQuMDA3LS42NzYtNS4yNDgtMS41NDgtMS4yNC0uODc0LTEuODYtMi4xOTQtMS44Ni0zLjk2cy42Mi0zLjA4NCAxLjg2LTMuOTU4YzEuMjQxLS44NzIgMi45OS0xLjM4OCA1LjI0OC0xLjU0OC41MjUtLjAyIDEuMTQ1LS4wMzkgMS44Ni0uMDYuNzE2LS4wMiAxLjQ1Mi0uMDMgMi4yMDgtLjAzek0xMzMgMi41NTVWMjkuNjVoLTQuMTIzVjE2LjM0M2gtNC4xMjN2LTMuOTIxaDQuMTIzVjIuNTU1SDEzM3ptLTk4LjE1NSAxNy42N3Y1LjE4NWgxNi44NzN2My42NUgzMC41MTN2LTguODM1aDQuMzMyem0zMi4xODctMTcuMDhjLS4yNDQgMi43MjgtLjY1NiA1LjI2OC0xLjIzNyA3LjYxOS0uNTggMi4zNS0xLjI2NyA0LjU0NS0yLjA2MSA2LjU4LS43OTUgMi4wMzktMS42NyAzLjkyNS0yLjYyNyA1LjY2Ny0uOTU4IDEuNzQtMS45MzQgMy4zNjMtMi45MzIgNC44NzFsLTMuNTEyLTIuMTdjLjk1Ni0xLjM2MSAxLjg1My0yLjgwMyAyLjY4OC00LjMxOS44MzQtMS41MTggMS41ODMtMy4wNzkgMi4yNDQtNC42OS42NjEtMS42MDcgMS4yMzItMy4yMzUgMS43MS00Ljg4NS40NzktMS42NDguODQtMy4yNzggMS4wODUtNC44ODZoLTYuOTYzVjMuMTQ0em01Ny4xNjEgMHYzLjczNGgtOS4zNDh2NS44NDFoOC42OTN2My42MTVoLTguNjkzdjcuMDc0bDEyLjI2NS0uNDh2My41NTNsLTE2LjQ5Mi44MTFWMy4xNDRoMTMuNTc1ek05NC43MTUgMjEuOTdjLS42ODYgMC0xLjM1Ni4wMS0yLjAxMi4wMjktLjY1NS4wMjItMS4yMzUuMDUtMS43NC4wOS0xLjAyNy4wOTktMS43NjguMzE3LTIuMjIyLjY1Ni0uNDU0LjMzNi0uNjguNzczLS42OCAxLjMwOCAwIC41MzguMjI2Ljk3My42OCAxLjMxLjQ1NC4zMzcgMS4xOTUuNTU1IDIuMjIyLjY1NC41MDUuMDQxIDEuMDg1LjA3IDEuNzQuMDkuNjU2LjAyIDEuMzI2LjAyOSAyLjAxMi4wMjkuNjg1IDAgMS4zNTUtLjAxIDIuMDExLS4wMjkuNjU1LS4wMiAxLjIzNC0uMDQ5IDEuNzM5LS4wOSAxLjAyOS0uMSAxLjc3LS4zMTcgMi4yMjQtLjY1NC40NTMtLjMzNy42OC0uNzcyLjY4LTEuMzEgMC0uNTM1LS4yMjctLjk3Mi0uNjgtMS4zMDgtLjQ1NC0uMzQtMS4xOTUtLjU1Ny0yLjIyNC0uNjU3LS41MDUtLjAzOC0xLjA4NC0uMDY3LTEuNzM5LS4wOS0uNjU2LS4wMTktMS4zMjYtLjAyOC0yLjAxMS0uMDI4ek01MS43MTggMi41NTV2MTkuNDM3aC00LjI1OXYtOS41OThoLTMuOTU4djUuODEzSDI4Ljc0NlYyLjg1Nmg0LjI1OXY0LjE1aDYuMjM4di00LjE1SDQzLjV2NS42MDNoMy45NThWMi41NTVoNC4yNTl6bTQ2LjYzNC41OXYzLjcyaC00Ljk0NGMtLjM2Ni42ODMtLjc3MyAxLjM4My0xLjIzMSAyLjEwNS0uMDc0LjExOC0uMTYuMjM0LS4yMzUuMzVsNy40ODUgNC44OTgtMi4zNTggMy4yNjItNy4yMzItNS4yMDVjLS4wMzcuMDQ4LS4wNy4wOTYtLjEwNy4xNDMtLjg5NSAxLjEzNy0xLjg0IDIuMjMyLTIuODM0IDMuMjgtLjk5NSAxLjA0Ny0xLjk4IDEuOTY2LTIuOTUzIDIuNzZsLTIuNzc1LTIuODA3Yy43NzYtLjYxMSAxLjU1MS0xLjMwNiAyLjMyNy0yLjA5Ljc3Ni0uNzgyIDEuNTI2LTEuNjA3IDIuMjUyLTIuNDcuNzI2LS44NjQgMS40MDItMS43NTggMi4wMy0yLjY4NC4zNDgtLjUxNi42NjUtMS4wMy45Ni0xLjU0Mkg4Mi42di0zLjcyaDE1Ljc1MnptNi40MTgtLjU5VjguMWgyLjkwM3YzLjk2aC0yLjkwM3Y2LjRoLTQuMTY1VjIuNTU0aDQuMTY1em0tNjUuNTI3IDguMDIzaC02LjIzOHYzLjk5N2g2LjIzOHYtMy45OTd6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAwMDAwMCwgNC4wMDAwMDApIi8+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K" />
          </Link>

          <InputWrapper>
            <InputBg>
              <form>
                <MainInput
                  type="text"
                  placeholder="상품명, 지역명, @상점명 입력"
                />
              </form>
            </InputBg>
          </InputWrapper>
          <MenuWrapper>
            <Link to={isLoggedIn ? "/products/new" : "/login"}>판매하기</Link>
            <ShopLink>
              <Link to={isLoggedIn ? `/shop/${user?._id}/products` : "/login"}>
                내상점
              </Link>
            </ShopLink>
            <TalkBtn>
              <Link to={isLoggedIn ? "/talk" : "/login"}>번개톡</Link>
            </TalkBtn>
          </MenuWrapper>
        </HeaderWrapper>
        <HeaderMenu>
          <MenuHamberg>
            <span></span>
            <span></span>
            <span></span>
          </MenuHamberg>
          <MenuLink href="/">
            <MenuB>번개장터 판매자센터</MenuB>
          </MenuLink>
        </HeaderMenu>
      </Wrapper>
      <SideMenu />
    </Container>
  );
};

export default Header;
