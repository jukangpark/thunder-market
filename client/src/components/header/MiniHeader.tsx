import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkState, isLoggedInState } from "../../atoms";
import { IUser } from "../../interface";

const Container = styled.div`
  display: flex;
  -webkit-box-pack: center;
  justify-content: space-between;
  border-bottom: 1px solid rgb(238, 238, 238);
  height: 40px;
`;

const LeftMenu = styled.div`
  display: flex;
  flex-shrink: 0;
`;
const AppDownload = styled.a`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  font-size: 13px;
  color: ${(props) => props.theme.btnColor};
  padding: 0 15px;
  position: relative;
  line-height: 1.4;
`;
const AppImg = styled.img`
  width: 16px;
  height: 17px;
  margin-right: 5px;
`;
const BookMark = styled.button`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  font-size: 13px;
  padding: 0px 15px;
  position: relative;
  line-height: 1.4;
`;
const BookMarkImg = styled.img`
  margin-right: 5px;
  width: 16px;
  height: 15px;
`;
const RightMenu = styled.div`
  display: flex;
  flex-shrink: 0;
  a {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    font-size: 13px;
    padding: 0 15px;
    position: relative;
    line-height: 1.4;
    color: ${(props) => props.theme.btnColor};
  }
`;
const LogInBtn = styled.button`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  font-size: 13px;
  padding: 0px 15px;
  position: relative;
  line-height: 1.4;
  cursor: pointer;
`;
const ToggleMode = styled.label`
  width: 50px;
  height: 26px;
  position: relative;
  display: inline-block;
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  margin: 0 15px;
  top: 7px;
  input:checked + span:before {
    -webkit-transform: translateX(24px);
    -ms-transform: translateX(24px);
    transform: translateX(24px);
  }
`;
const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;
const ToggleSwitch = styled.span`
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.textColor};
  position: absolute;
  cursor: pointer;
  transition: 0.3s;
  -webkit-transition: 0.3s;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  border-radius: 34px;
  :before {
    position: absolute;
    content: "";
    width: 18px;
    height: 18px;
    left: 3px;
    top: 3px;
    background-color: ${(props) => props.theme.textColor};
    border-radius: 50%;
    transition: 0.3s;
    -webkit-transition: 0.3s;
  }
`;
const MiniHeader = () => {
  const BtnFn = useSetRecoilState(isDarkState);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [user, setUser] = useState<IUser>();

  const isLoggedIn = Boolean(cookies.user);

  useEffect(() => {
    if (cookies.user) {
      fetch("/user/info")
        .then((res) => res.json())
        .then((data) => setUser(data));
    }
  }, []);

  const onClick = () => {
    BtnFn((prev) => !prev);
  };

  const LoggedOut = () => {
    removeCookie("user");
    //await 안해주면 로그아웃 처리 안된 상태에서 setIsloggedIn 이 (false) 가됨.
    // setIsLoggedIn(false);
    alert("로그아웃이 완료되었습니다.");
    window.location.replace("/"); // 홈화면으로 갔을 때 새로고침 해서 cookie에 있는 user 값 사라지게 갱신
  };

  return (
    <Container>
      <LeftMenu>
        <AppDownload>
          <AppImg src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTYiIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxNiAxNyI+CiAgICA8ZGVmcz4KICAgICAgICA8cGF0aCBpZD0ibTg4aW90dDQ5YSIgZD0iTTE2IDExLjAxOGwtLjAwMS41N2MtLjAwMS4xNi0uMDAzLjMyLS4wMDcuNDgxLS4wMS4zNDktLjAzLjcwMS0uMDk0IDEuMDQ2LS4wNjMuMzUtLjE2Ny42NzYtLjMzMS45OTUtLjE2MS4zMTItLjM3MS41OTktLjYyMi44NDdzLS41NC40NTYtLjg1Ny42MTVjLS4zMjIuMTYyLS42NTEuMjY1LTEuMDA2LjMyOC0uMzQ5LjA2Mi0uNzA1LjA4Mi0xLjA1OC4wOTItLjY3OS4wMDgtLjg3MS4wMDgtMS4wNjQuMDA4SDUuMDRjLS43NC0uMDAyLS45MDItLjAwNC0xLjA2NC0uMDA4LS4zNTMtLjAxLS43MDktLjAzLTEuMDU4LS4wOTItLjM1NC0uMDYzLS42ODQtLjE2Ni0xLjAwNi0uMzI4LS4zMTYtLjE2LS42MDYtLjM2Ny0uODU3LS42MTUtLjI1LS4yNDgtLjQ2LS41MzUtLjYyMi0uODQ3LS4xNjQtLjMxOS0uMjY4LS42NDUtLjMzMS0uOTk1LS4wNjMtLjM0NS0uMDg0LS42OTctLjA5My0xLjA0Ni0uMDA1LS4xNi0uMDA3LS4zMi0uMDA4LS40OEwwIDExLjAxOFY0Ljk4MmwuMDAxLS41N2MuMDAxLS4xNi4wMDMtLjMyLjAwOC0uNDgxLjAxLS4zNDkuMDMtLjcwMS4wOTMtMS4wNDYuMDYzLS4zNS4xNjctLjY3Ni4zMzEtLjk5NS4xNjEtLjMxMy4zNzEtLjU5OS42MjItLjg0N3MuNTQtLjQ1Ni44NTctLjYxNUMyLjIzNC4yNjYgMi41NjQuMTYzIDIuOTE4LjFjLjM1LS4wNjIuNzA1LS4wODIgMS4wNTgtLjA5MkM0LjY1NiAwIDQuODQ4IDAgNS4wNCAwSDEwLjgwMiA4Ljc1aDIuMjFjLjc0LjAwMi45MDIuMDA0IDEuMDY0LjAwOC4zNTMuMDEuNzA5LjAzIDEuMDU4LjA5Mi4zNTUuMDYzLjY4NC4xNjYgMS4wMDYuMzI4LjMxNi4xNi42MDYuMzY3Ljg1Ny42MTUuMjUuMjQ4LjQ2MS41MzQuNjIyLjg0Ny4xNjQuMzE5LjI2OC42NDQuMzMxLjk5NS4wNjMuMzQ1LjA4NC42OTcuMDk0IDEuMDQ2LjAwNC4xNi4wMDYuMzIuMDA3LjQ4bC4wMDEuNTcxdjYuMDM2eiIvPgogICAgPC9kZWZzPgogICAgPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAwMDAwMCwgMS4wMDAwMDApIj4KICAgICAgICAgICAgPG1hc2sgaWQ9IjN4bmRjNnc0YWIiIGZpbGw9IiNmZmYiPgogICAgICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPSIjbTg4aW90dDQ5YSIvPgogICAgICAgICAgICA8L21hc2s+CiAgICAgICAgICAgIDxwYXRoIGZpbGw9IiNEODBDMTgiIGQ9Ik0wIDBIMTZWMTZIMHoiIG1hc2s9InVybCgjM3huZGM2dzRhYikiLz4KICAgICAgICAgICAgPGcgZmlsbD0iI0ZGRiIgbWFzaz0idXJsKCMzeG5kYzZ3NGFiKSI+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNOC45MSA0LjkyMUwzLjY0MyAxMC41NmMtLjAzNC4wMzYtLjA5NS4wMDgtLjA4OS0uMDQybC41ODgtNC43NzZIMS43MDRjLS4wNDUgMC0uMDY4LS4wNTQtLjAzOC0uMDg3TDYuOTMzLjAxN2MuMDM0LS4wMzcuMDk1LS4wMDkuMDg5LjA0MWwtLjU4OCA0Ljc3NmgyLjQzN2MuMDQ2IDAgLjA3LjA1NC4wMzkuMDg3eiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMi43MTE4NjQsIDIuNzExODY0KSIvPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K" />
          앱다운로드
        </AppDownload>
        <BookMark>
          <BookMarkImg src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNSIgdmlld0JveD0iMCAwIDE2IDE1Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggc3Ryb2tlPSIjQ0NDIiBkPSJNLTE2LjUtMTYuNWg0OXY0OWgtNDl6Ii8+CiAgICAgICAgPHBhdGggZmlsbD0iI0U5QjQ1NyIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNOCAwbDIuNSA0LjkzNCA1LjUuNzktNCAzLjg0OC45IDUuNDI4TDggMTIuNDM0IDMuMSAxNSA0IDkuNTcyIDAgNS43MjRsNS41LS43OXoiLz4KICAgIDwvZz4KPC9zdmc+Cg==" />
          즐겨찾기
        </BookMark>
      </LeftMenu>
      <RightMenu>
        {isLoggedIn ? (
          <>
            <Link to={`/shop/${user?._id}/products`}>{user?.username}</Link>
            <LogInBtn onClick={LoggedOut}>로그아웃</LogInBtn>
          </>
        ) : (
          <LogInBtn>
            <Link to="/login">로그인</Link>
            <Link to="/join">회원 가입</Link>
          </LogInBtn>
        )}
        <Link to={isLoggedIn ? `/shop/${user?._id}/products` : `/login`}>
          내 상점
        </Link>
        <ToggleMode>
          <ToggleInput type={"checkbox"} onClick={onClick} />
          <ToggleSwitch />
        </ToggleMode>
      </RightMenu>
    </Container>
  );
};

export default MiniHeader;
