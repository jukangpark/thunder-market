import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import styled from "styled-components";
import { Wrapper } from "../../components/commonStyle/fundamental";
import MiniHeader from "../../components/header/MiniHeader";
import Header from "../../components/header/Header";
import { IUser } from "../../interface";
import Footer from "../../components/Footer";
import Moment from "react-moment";
import { useCookies } from "react-cookie";

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  z-index: 30;
  background: #000;
  opacity: 0.8;
`;

const FormWrapper = styled.div`
  width: 600px;
  height: 450px;
  background: white;
  z-index: 40;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 30px;
  transition: 0.5s ease-out;
  form {
    display: grid;
    align-items: center;
    justify-content: center;
    input {
    display: none;
  }
  label {
    width: 300px;
  height: 300px;
  cursor: pointer;
  margin-bottom: 15px;
  display: block;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
  border: 1px solid #999;
  margin-top: 30px;
  }
  }
`;

const BtnBox = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  > button {
    width: 100px;
    height: 40px;
    border-radius: 25px;
    font-size: 13px;
    cursor: pointer;
  }
  > button:first-child {
    background: rgb(247, 51, 47);
    color: white;
    margin-right: 10px;
  }
  > button:last-child {
    background: rgb(204, 204, 204);
    color: rgb(36, 36, 36);
  }
`;

const Container = styled.div`
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  > div {
    width: 1024px;
    margin-top: 30px;
      > div:first-child {
      margin-bottom: 30px;
        > div {
        display: flex; 
        width: 100%;
          > div:first-child {
            flex-shrink: 0;
          }
        }
      }
    }
`;
const MyInfo = styled.div`
  flex: 1 0 0%;
  padding: 0px 30px;
  border: 1px solid rgb(238, 238, 238);
  border-left: 0;
  display: flex;
  height: 310px;
  flex-direction: column;
  box-sizing: border-box;
  > div:nth-child(1) {
    font-size: 18px;
    height: 75px;
    font-weight: 600;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
    flex-shrink: 0;
  }
  > div:nth-child(2) {
    height: 45px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    border-top: 1px solid ${(props) => props.theme.btnColor};
    border-bottom: 1px solid ${(props) => props.theme.btnColor};
    margin-bottom: 20px;
    flex-shrink: 0;
    > div {
      margin-right: 30px;
      font-size: 13px;
      color: ${(props) => props.theme.textColor};
      display: flex;
      > span {
        margin-left: 5px;
        font-weight: 600;
  }
    }
     img {
      width: 14px;
      height: 13px;
      margin-right: 10px;
    }
  }
  > div:nth-child(3) {
    -webkit-box-flex: 1;
    flex-grow: 1;
    width: 100%;
    overflow-y: auto;
    line-height: 1.57;
    white-space: pre-wrap;
  }
  > div:nth-child(4) {
    height: 56px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    flex-shrink: 0;
  }
`;
const InfoName = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  > button {
    margin-left: 10px;
    height: 20px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    padding: 0 5px;
    color: rgb(136, 136, 136);
    border: 1px solid rgb(238, 238, 238);
    font-size: 11px;
  }
`;

const SelfAuth = styled.div`
  font-size: 11px;
  color: ${(props) => props.theme.textColor};
  position: relative;
  ::after {
    content: "OK";
    color: ${(props) => props.theme.textColor};
    font-size: 9px;
    background-color: rgb(255, 195, 34);
    border-radius: 6px;
    position: absolute;
    padding: 2px 4px 1px;
    top: -1px;
    left: -25px;
    box-sizing: border-box;
  }
`;
const IntroModify = styled.button`
  height: 20px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  padding: 0px 5px;
  color: ${(props) => props.theme.textColor};
  border: 1px solid rgb(238, 238, 238);
  font-size: 11px;
  cursor: pointer;
`;
const ProfileSize = styled.div`
  width: 310px;
  height: 310px;
  position: relative;
  > div:first-child {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  > div:last-child {
    position: inherit;
    display: flex;
    width: 100%;
    height: 100%;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    flex-direction: column;
    box-shadow: rgb(4 0 0 / 3%) 0px 5px 10px;
  }
`;
const BgOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.5;
  z-index: 0;
`;
const ProfileBg = styled.div`
  position: absolute;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-image: url("https://i.pinimg.com/550x/44/62/7a/44627a15e37008a60b70c389d813a54e.jpg");
  background-color: rgb(181, 181, 181);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const ShopName = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
  color: rgb(255, 255, 255);
`;

const Scope = styled.div`
  display: flex;
  img {
    vertical-align: bottom;
  width: 15px;
  height: 14px;
  }
`;

const ShopManagement = styled.div`
  display: flex;
  margin-top: 20px;
  a {
    width: 106px;
    border: 1px solid rgb(255, 255, 255);
    height: 40px;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    font-size: 13px;
    color: rgb(255, 255, 255);
  }
`;
const MenuBox = styled.div`
  display: flex;
  line-height: 50px;
  text-align: center;
  a {
    cursor: pointer;
    text-align: center;
    width: 20%;
    align-items: center;
    display: block;
    border: 1px solid rgb(238, 238, 238);
    border-left: 0;
    background-color: ${(props) => props.theme.bgColor};
    b {
      margin-left: 5px;
    }
  }
`;

const ProfileImage = styled.label`
  width: 100px;
  height: 100px;
  cursor: pointer;
  margin-bottom: 15px;
  display: block;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
`;
const IntroductionModify = styled.div`
  -webkit-box-flex: 1;
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: 20px;
  display: flex;
  form {
    width: 100%;
    height: 100%;
    display: flex;
  }
  textarea {
    -webkit-box-flex: 1;
    flex-grow: 1;
    resize: none;
    border: 1px solid rgb(238, 238, 238);
    outline: none;
  }
  button {
    width: 100px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    border: 1px solid rgb(238, 238, 238);
    border-left: 0;
    background-color: rgb(250, 250, 250);
    color: rgb(136, 136, 136);
  }
`;

const Shop = () => {
  const { id } = useParams(); // params 에서 id값 이거 어케하지....
  const [user, setUser] = useState<IUser>();
  const [loggedInUser, setLoggedInUser] = useState<IUser>();
  const [text, setText] = useState("");
  const [change, setChange] = useState(false);
  const [intro, setIntro] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const isLoggedIn = Boolean(cookies.user);

  const [profile, setProfile] = useState({
    file: null,
    profileImage: "",
  });

  useEffect(() => {
    fetchUserInfo();

    if (isLoggedIn) {
      fetch("/user/loggedIn/info")
        .then((res) => res.json())
        .then((data) => setLoggedInUser(data));
    }
  }, [id]);

  const fetchUserInfo = () => {
    fetch(`/user/${id}/info`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await fetch(`/user/${id}/introduction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
      }),
    })
      .then((res) => res.json())
      .then((data) => alert(data.message));

    setIntro(!intro);
    fetchUserInfo();
  };

  const clickModify = async () => {
    console.log(text);

    setIntro(!intro);
  };

  const onClick = () => {
    if (loggedInUser?._id !== user?._id) {
      return;
    }
    setChange(true);
  };
  const offClick = (event: any) => {
    event.preventDefault();
    setChange(false);
    setProfile({
      file: null,
      profileImage: "",
    });
  };

  const getProfile = (file: any) => {
    return new Promise((resolve) => {
      let baseUrl: any = "";

      let reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        baseUrl = reader.result;
        resolve(baseUrl);
      };
    });
  };

  const handleProfile = (event: any) => {
    const file = event.target.files[0];

    getProfile(file).then((result: any) => {
      file["base64"] = result;

      setProfile({
        file,
        profileImage: result,
      });
    });
  };

  const onChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setText(value);
  };

  return (
    <Wrapper>
      {change ? (
        <>
          <Overlay onClick={offClick} />
          <FormWrapper>
            <form
              method="POST"
              action="/user/profile/image"
              encType="multipart/form-data"
            >
              {profile.profileImage ? (
                <label
                  style={{
                    backgroundImage: `url(${profile?.profileImage.replaceAll(
                      "\\",
                      "/"
                    )})`,
                  }}
                  htmlFor="profileImage"
                />
              ) : (
                <label
                  style={{
                    backgroundImage:
                      "url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxjaXJjbGUgZmlsbD0iI0ZBRkFGQSIgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIi8+CiAgICAgICAgPHBhdGggZD0iTTM2LjIxNiA0MS42ODNjLjI0OC0xLjkzMS40OTgtMy44NjIuNzUtNS43OTRoNi43OWwtLjI4MyA1LjUzN2MwIC4wMTcuMDA3LjAzNC4wMDcuMDUxLS4wMDIuMDEtLjAwMi4wMi0uMDAyLjAzLS4wOTggMS44NzYtMS44OTcgMy4zOTItNC4wMzUgMy4zOTItMS4wNjYgMC0yLjAxOC0uMzktMi42MTUtMS4wNzItLjUxLS41ODUtLjcyMi0xLjMyNS0uNjEyLTIuMTQ0em04Ljg4OCA0LjA3OGMxLjIyNCAxLjI4OSAzLjAwOSAyLjAyOCA0Ljg5IDIuMDI4IDEuODkgMCAzLjY3NC0uNzQgNC45LTIuMDMzLjEwNy0uMTEyLjIwNy0uMjI4LjMwNC0uMzQ1IDEuMjggMS40NDcgMy4yMTcgMi4zNzggNS4zNSAyLjM3OC4xMTIgMCAuMjE2LS4wMjcuMzI4LS4wMzJWNjMuNkgzOS4xMTVWNDcuNzU3Yy4xMTIuMDA1LjIxNS4wMzIuMzI4LjAzMiAyLjEzMyAwIDQuMDcxLS45MzEgNS4zNTEtMi4zOC4wOTkuMTIxLjIuMjM4LjMxLjM1MnptMS41NDUtOS44NzJoNi42OThsLjI4MiA1LjYxOWMwIC4wMTUtLjAwNy4wMjctLjAwNy4wNGwuMDA0LjA4NmEyLjkzOSAyLjkzOSAwIDAgMS0uODI2IDIuMTMyYy0xLjM2NyAxLjQ0LTQuMjMzIDEuNDQxLTUuNjA0LjAwM2EyLjk1IDIuOTUgMCAwIDEtLjgzLTIuMTQybC4wMDQtLjA3OGMwLS4wMTYtLjAwOC0uMDMtLjAwOC0uMDQ4bC4yODctNS42MTJ6bTE2LjM3NiAwYy4yNTIgMS45MzMuNTAyIDMuODY1Ljc1MyA1LjgwNC4xMDkuODEtLjEwNCAxLjU0Ny0uNjE0IDIuMTMyLS41OTYuNjgzLTEuNTUgMS4wNzQtMi42MTYgMS4wNzQtMi4xMzcgMC0zLjkzMi0xLjUxNC00LjAzNC0zLjM4OGEuMzU5LjM1OSAwIDAgMC0uMDAzLS4wNDRjMC0uMDE1LjAwNi0uMDI3LjAwNi0uMDRsLS4yNzgtNS41MzhoNi43ODZ6TTM2LjIyNiA0Ni45NDZ2MTguMDk4YzAgLjc5OC42NDYgMS40NDUgMS40NDQgMS40NDVoMjQuNjVjLjc5OSAwIDEuNDQ1LS42NDcgMS40NDUtMS40NDVWNDYuOTQ2Yy41OS0uMzI4IDEuMTM3LS43MTkgMS41NzUtMS4yMiAxLjA2MS0xLjIxNCAxLjUyMi0yLjc4NSAxLjMwMS00LjQxLS4zLTIuMzU1LS42MDctNC43MDctLjkxOC03LjA2YTEuNDQzIDEuNDQzIDAgMCAwLTEuNDMxLTEuMjU3SDM1LjY5OWMtLjcyNCAwLTEuMzM4LjUzOC0xLjQzMSAxLjI1Ny0uMzExIDIuMzU0LS42MTcgNC43MDctLjkxNiA3LjA1LS4yMjEgMS42MzcuMjQgMy4yMDggMS4zIDQuNDIxLjQzOS41MDIuOTg0Ljg5MyAxLjU3NCAxLjIyeiIgZmlsbD0iI0NDQyIvPgogICAgPC9nPgo8L3N2Zz4K)",
                  }}
                  htmlFor="profileImage"
                />
              )}
              <input
                type="file"
                name="profileImage"
                id="profileImage"
                onChange={handleProfile}
              />
              <BtnBox>
                <button>등록</button>
                <button onClick={offClick}>취소</button>
              </BtnBox>
            </form>
          </FormWrapper>
        </>
      ) : null}
      <MiniHeader />
      <Header />
      <Container>
        <div>
          <div>
            <div>
                <ProfileSize>
                  <div>
                    <BgOverlay></BgOverlay>
                    <ProfileBg></ProfileBg>
                  </div>
                  <div>
                    {user?.profileImageUrl ? (
                      <ProfileImage
                        style={{
                          backgroundImage: `url(${user?.profileImageUrl.replaceAll(
                            "\\",
                            "/"
                          )})`,
                        }}
                        onClick={onClick}
                      />
                    ) : (
                      <ProfileImage
                        style={{
                          backgroundImage:
                            "url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxjaXJjbGUgZmlsbD0iI0ZBRkFGQSIgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIi8+CiAgICAgICAgPHBhdGggZD0iTTM2LjIxNiA0MS42ODNjLjI0OC0xLjkzMS40OTgtMy44NjIuNzUtNS43OTRoNi43OWwtLjI4MyA1LjUzN2MwIC4wMTcuMDA3LjAzNC4wMDcuMDUxLS4wMDIuMDEtLjAwMi4wMi0uMDAyLjAzLS4wOTggMS44NzYtMS44OTcgMy4zOTItNC4wMzUgMy4zOTItMS4wNjYgMC0yLjAxOC0uMzktMi42MTUtMS4wNzItLjUxLS41ODUtLjcyMi0xLjMyNS0uNjEyLTIuMTQ0em04Ljg4OCA0LjA3OGMxLjIyNCAxLjI4OSAzLjAwOSAyLjAyOCA0Ljg5IDIuMDI4IDEuODkgMCAzLjY3NC0uNzQgNC45LTIuMDMzLjEwNy0uMTEyLjIwNy0uMjI4LjMwNC0uMzQ1IDEuMjggMS40NDcgMy4yMTcgMi4zNzggNS4zNSAyLjM3OC4xMTIgMCAuMjE2LS4wMjcuMzI4LS4wMzJWNjMuNkgzOS4xMTVWNDcuNzU3Yy4xMTIuMDA1LjIxNS4wMzIuMzI4LjAzMiAyLjEzMyAwIDQuMDcxLS45MzEgNS4zNTEtMi4zOC4wOTkuMTIxLjIuMjM4LjMxLjM1MnptMS41NDUtOS44NzJoNi42OThsLjI4MiA1LjYxOWMwIC4wMTUtLjAwNy4wMjctLjAwNy4wNGwuMDA0LjA4NmEyLjkzOSAyLjkzOSAwIDAgMS0uODI2IDIuMTMyYy0xLjM2NyAxLjQ0LTQuMjMzIDEuNDQxLTUuNjA0LjAwM2EyLjk1IDIuOTUgMCAwIDEtLjgzLTIuMTQybC4wMDQtLjA3OGMwLS4wMTYtLjAwOC0uMDMtLjAwOC0uMDQ4bC4yODctNS42MTJ6bTE2LjM3NiAwYy4yNTIgMS45MzMuNTAyIDMuODY1Ljc1MyA1LjgwNC4xMDkuODEtLjEwNCAxLjU0Ny0uNjE0IDIuMTMyLS41OTYuNjgzLTEuNTUgMS4wNzQtMi42MTYgMS4wNzQtMi4xMzcgMC0zLjkzMi0xLjUxNC00LjAzNC0zLjM4OGEuMzU5LjM1OSAwIDAgMC0uMDAzLS4wNDRjMC0uMDE1LjAwNi0uMDI3LjAwNi0uMDRsLS4yNzgtNS41MzhoNi43ODZ6TTM2LjIyNiA0Ni45NDZ2MTguMDk4YzAgLjc5OC42NDYgMS40NDUgMS40NDQgMS40NDVoMjQuNjVjLjc5OSAwIDEuNDQ1LS42NDcgMS40NDUtMS40NDVWNDYuOTQ2Yy41OS0uMzI4IDEuMTM3LS43MTkgMS41NzUtMS4yMiAxLjA2MS0xLjIxNCAxLjUyMi0yLjc4NSAxLjMwMS00LjQxLS4zLTIuMzU1LS42MDctNC43MDctLjkxOC03LjA2YTEuNDQzIDEuNDQzIDAgMCAwLTEuNDMxLTEuMjU3SDM1LjY5OWMtLjcyNCAwLTEuMzM4LjUzOC0xLjQzMSAxLjI1Ny0uMzExIDIuMzU0LS42MTcgNC43MDctLjkxNiA3LjA1LS4yMjEgMS42MzcuMjQgMy4yMDggMS4zIDQuNDIxLjQzOS41MDIuOTg0Ljg5MyAxLjU3NCAxLjIyeiIgZmlsbD0iI0NDQyIvPgogICAgPC9nPgo8L3N2Zz4K)",
                        }}
                        onClick={onClick}
                      />
                    )}
                    <ShopName>{user?.username}</ShopName>
                    <Scope>
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAYAAAB2+A+pAAAAAXNSR0IArs4c6QAAAqNJREFUSA2tVk1rE0EYzrYbSKQXRYIfCaUiggaJJiH+AIsnL1poRQ+CBy8VvOivUA8evHgoeNCbRz3pH5B8HlIvYpG0VULxJBqMZn2eZWc7O5nZ7I5deJl33vf5yMzsTpvJWD6tVussw5KembMlgnc9CCsJa2PP81YYVq4gOTbEXq+3NB6PP5ObzWZPVSqVrbQ6ViuGKbfZf+Rc1JKMVsaO44RbLOdJDAUm9Va32+0TONtthM+FsYcoVqvVXSGaZEy9YhheE6Y0YM5aEjMZk9oY5PB8JSFdTWpPp6m2utlsHoXEN8S8IvUX82P1en1PqRunbrfbvYitOmRESI3JZLIMrGpKxDzOeb3T6byT4MYU2J8Orz2IvQLqghF5sI0ujG/O1Wq1j/l8/hImjxHewXrsq1GbHvSiZ+SM8alcxupfIE7uU/4/g+EO4jY+ufdCLWLMYr/fPzIajZ7DPLwkBNhmhOHrXC53t1wuf5f5U8aiidXfgflTxIKopRlh+ANxH6vc0PGMxgTjxTsN45dIGzpyTO0DTG/hLD+ZMLHGJMHYxep7GM+ZROQ6DDexygrGP3JdzWfeXPg2D8P0jEo0zYklx9QX9ZnGAPIlcwUhwUjszBdzpjFWcCOBWQSShBN7xribj+Os+Cdw6gei7l+P6C1HXDFBb4J6EXf3V7Un5lOCohGMq6opRH+j9wAv0BUG86AWUgPOaljQJLHGEFyTOZhvIhpYyROMvAK9IG+wp2AjXLnH3LjV+IQW8cu3ED4Gws8KhcLDUqn0SxXhfDAY5IfD4SPg1zkPftgSduUL5+pjXDEEuM3gO0OQruIyuGcypSh7xBBLDrnUYE/3xBnzbX7ruu55bOcbHVlXI5YccmGc7ovA/81FXJf+lunEk9aoQS0d/h/pAwlu3rYpxwAAAABJRU5ErkJggg==" alt="Can't watch that" />
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAYAAAB2+A+pAAAAAXNSR0IArs4c6QAAAqNJREFUSA2tVk1rE0EYzrYbSKQXRYIfCaUiggaJJiH+AIsnL1poRQ+CBy8VvOivUA8evHgoeNCbRz3pH5B8HlIvYpG0VULxJBqMZn2eZWc7O5nZ7I5deJl33vf5yMzsTpvJWD6tVussw5KembMlgnc9CCsJa2PP81YYVq4gOTbEXq+3NB6PP5ObzWZPVSqVrbQ6ViuGKbfZf+Rc1JKMVsaO44RbLOdJDAUm9Va32+0TONtthM+FsYcoVqvVXSGaZEy9YhheE6Y0YM5aEjMZk9oY5PB8JSFdTWpPp6m2utlsHoXEN8S8IvUX82P1en1PqRunbrfbvYitOmRESI3JZLIMrGpKxDzOeb3T6byT4MYU2J8Orz2IvQLqghF5sI0ujG/O1Wq1j/l8/hImjxHewXrsq1GbHvSiZ+SM8alcxupfIE7uU/4/g+EO4jY+ufdCLWLMYr/fPzIajZ7DPLwkBNhmhOHrXC53t1wuf5f5U8aiidXfgflTxIKopRlh+ANxH6vc0PGMxgTjxTsN45dIGzpyTO0DTG/hLD+ZMLHGJMHYxep7GM+ZROQ6DDexygrGP3JdzWfeXPg2D8P0jEo0zYklx9QX9ZnGAPIlcwUhwUjszBdzpjFWcCOBWQSShBN7xribj+Os+Cdw6gei7l+P6C1HXDFBb4J6EXf3V7Un5lOCohGMq6opRH+j9wAv0BUG86AWUgPOaljQJLHGEFyTOZhvIhpYyROMvAK9IG+wp2AjXLnH3LjV+IQW8cu3ED4Gws8KhcLDUqn0SxXhfDAY5IfD4SPg1zkPftgSduUL5+pjXDEEuM3gO0OQruIyuGcypSh7xBBLDrnUYE/3xBnzbX7ruu55bOcbHVlXI5YccmGc7ovA/81FXJf+lunEk9aoQS0d/h/pAwlu3rYpxwAAAABJRU5ErkJggg==" alt="Can't watch that" />
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAYAAAB2+A+pAAAAAXNSR0IArs4c6QAAAqNJREFUSA2tVk1rE0EYzrYbSKQXRYIfCaUiggaJJiH+AIsnL1poRQ+CBy8VvOivUA8evHgoeNCbRz3pH5B8HlIvYpG0VULxJBqMZn2eZWc7O5nZ7I5deJl33vf5yMzsTpvJWD6tVussw5KembMlgnc9CCsJa2PP81YYVq4gOTbEXq+3NB6PP5ObzWZPVSqVrbQ6ViuGKbfZf+Rc1JKMVsaO44RbLOdJDAUm9Va32+0TONtthM+FsYcoVqvVXSGaZEy9YhheE6Y0YM5aEjMZk9oY5PB8JSFdTWpPp6m2utlsHoXEN8S8IvUX82P1en1PqRunbrfbvYitOmRESI3JZLIMrGpKxDzOeb3T6byT4MYU2J8Orz2IvQLqghF5sI0ujG/O1Wq1j/l8/hImjxHewXrsq1GbHvSiZ+SM8alcxupfIE7uU/4/g+EO4jY+ufdCLWLMYr/fPzIajZ7DPLwkBNhmhOHrXC53t1wuf5f5U8aiidXfgflTxIKopRlh+ANxH6vc0PGMxgTjxTsN45dIGzpyTO0DTG/hLD+ZMLHGJMHYxep7GM+ZROQ6DDexygrGP3JdzWfeXPg2D8P0jEo0zYklx9QX9ZnGAPIlcwUhwUjszBdzpjFWcCOBWQSShBN7xribj+Os+Cdw6gei7l+P6C1HXDFBb4J6EXf3V7Un5lOCohGMq6opRH+j9wAv0BUG86AWUgPOaljQJLHGEFyTOZhvIhpYyROMvAK9IG+wp2AjXLnH3LjV+IQW8cu3ED4Gws8KhcLDUqn0SxXhfDAY5IfD4SPg1zkPftgSduUL5+pjXDEEuM3gO0OQruIyuGcypSh7xBBLDrnUYE/3xBnzbX7ruu55bOcbHVlXI5YccmGc7ovA/81FXJf+lunEk9aoQS0d/h/pAwlu3rYpxwAAAABJRU5ErkJggg==" alt="Can't watch that" />
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAYAAAB2+A+pAAAAAXNSR0IArs4c6QAAAqNJREFUSA2tVk1rE0EYzrYbSKQXRYIfCaUiggaJJiH+AIsnL1poRQ+CBy8VvOivUA8evHgoeNCbRz3pH5B8HlIvYpG0VULxJBqMZn2eZWc7O5nZ7I5deJl33vf5yMzsTpvJWD6tVussw5KembMlgnc9CCsJa2PP81YYVq4gOTbEXq+3NB6PP5ObzWZPVSqVrbQ6ViuGKbfZf+Rc1JKMVsaO44RbLOdJDAUm9Va32+0TONtthM+FsYcoVqvVXSGaZEy9YhheE6Y0YM5aEjMZk9oY5PB8JSFdTWpPp6m2utlsHoXEN8S8IvUX82P1en1PqRunbrfbvYitOmRESI3JZLIMrGpKxDzOeb3T6byT4MYU2J8Orz2IvQLqghF5sI0ujG/O1Wq1j/l8/hImjxHewXrsq1GbHvSiZ+SM8alcxupfIE7uU/4/g+EO4jY+ufdCLWLMYr/fPzIajZ7DPLwkBNhmhOHrXC53t1wuf5f5U8aiidXfgflTxIKopRlh+ANxH6vc0PGMxgTjxTsN45dIGzpyTO0DTG/hLD+ZMLHGJMHYxep7GM+ZROQ6DDexygrGP3JdzWfeXPg2D8P0jEo0zYklx9QX9ZnGAPIlcwUhwUjszBdzpjFWcCOBWQSShBN7xribj+Os+Cdw6gei7l+P6C1HXDFBb4J6EXf3V7Un5lOCohGMq6opRH+j9wAv0BUG86AWUgPOaljQJLHGEFyTOZhvIhpYyROMvAK9IG+wp2AjXLnH3LjV+IQW8cu3ED4Gws8KhcLDUqn0SxXhfDAY5IfD4SPg1zkPftgSduUL5+pjXDEEuM3gO0OQruIyuGcypSh7xBBLDrnUYE/3xBnzbX7ruu55bOcbHVlXI5YccmGc7ovA/81FXJf+lunEk9aoQS0d/h/pAwlu3rYpxwAAAABJRU5ErkJggg==" alt="Can't watch that" />
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAYAAAB2+A+pAAAAAXNSR0IArs4c6QAAAqNJREFUSA2tVk1rE0EYzrYbSKQXRYIfCaUiggaJJiH+AIsnL1poRQ+CBy8VvOivUA8evHgoeNCbRz3pH5B8HlIvYpG0VULxJBqMZn2eZWc7O5nZ7I5deJl33vf5yMzsTpvJWD6tVussw5KembMlgnc9CCsJa2PP81YYVq4gOTbEXq+3NB6PP5ObzWZPVSqVrbQ6ViuGKbfZf+Rc1JKMVsaO44RbLOdJDAUm9Va32+0TONtthM+FsYcoVqvVXSGaZEy9YhheE6Y0YM5aEjMZk9oY5PB8JSFdTWpPp6m2utlsHoXEN8S8IvUX82P1en1PqRunbrfbvYitOmRESI3JZLIMrGpKxDzOeb3T6byT4MYU2J8Orz2IvQLqghF5sI0ujG/O1Wq1j/l8/hImjxHewXrsq1GbHvSiZ+SM8alcxupfIE7uU/4/g+EO4jY+ufdCLWLMYr/fPzIajZ7DPLwkBNhmhOHrXC53t1wuf5f5U8aiidXfgflTxIKopRlh+ANxH6vc0PGMxgTjxTsN45dIGzpyTO0DTG/hLD+ZMLHGJMHYxep7GM+ZROQ6DDexygrGP3JdzWfeXPg2D8P0jEo0zYklx9QX9ZnGAPIlcwUhwUjszBdzpjFWcCOBWQSShBN7xribj+Os+Cdw6gei7l+P6C1HXDFBb4J6EXf3V7Un5lOCohGMq6opRH+j9wAv0BUG86AWUgPOaljQJLHGEFyTOZhvIhpYyROMvAK9IG+wp2AjXLnH3LjV+IQW8cu3ED4Gws8KhcLDUqn0SxXhfDAY5IfD4SPg1zkPftgSduUL5+pjXDEEuM3gO0OQruIyuGcypSh7xBBLDrnUYE/3xBnzbX7ruu55bOcbHVlXI5YccmGc7ovA/81FXJf+lunEk9aoQS0d/h/pAwlu3rYpxwAAAABJRU5ErkJggg==" alt="Can't watch that" />
                    </Scope>
                    <ShopManagement>
                      <Link to="/products/manage">내 상점 관리</Link>
                    </ShopManagement>
                  </div>
                </ProfileSize>
            <MyInfo>
              <div>
                <InfoName>
                  {user?.username}
                  <button>상점명 수정</button>
                </InfoName>
                <SelfAuth>본인인증 완료</SelfAuth>
              </div>
              <div>
                <div>
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAAfBJREFUSA3tU79rFFEQntkcuBesDF5pdyRFrjNaiJBgERA0pEh1P4yCC4rWFiH/gIWN1W4iIclZeKRIlS6gSZkUQQsbOwtBwUp2n4f3xm827LK32eICd90NHDvvm+/N9+bHMcGioHEkInfVH7Yx86ey155n2WlWTCQ/hMQZtojmY6ae67gVxxhaGpWIConQhBFzH1XYZQVGaWL5obbr3ihFNDcTLVLoN06KhICfdTdbt/IxE9SfG7/xLI93/ebtKGi+y+N6DoPGTwfD+iNbq26WIAcvr+AV1Z6V6SyuvhDVLNMFvEdSw6xrF/jIzUKfIcR7pvvvjXQ6E3EiEY6+/36NS5OY3yvZbk0ll8PNR3dI+DEe8eSvvzqT4JHfugF/HZOfMxtNL8E1p+ZWDdyJS3vLIovYxVM8WV82m5CB/QL2EcRrxDKvW6QxJg5R3eG5Lwvwr2bunID/DcI3QfxQ9t6vlzSIsr5YkRcIVFNy4ohch7uCRHHfUjiumB7k4PMwKgN/Tg8lLu3rdyR/Uk2ct7FQviMDn+NlyLOxUW12+DiLW2v95Ix1PcavnZzzX7Gyhs3VlU+tWAgi7tPdIGXBCf16KoR1/+p6/fE+blD3wOkTGi9DtkOX8gtnpIPvm8mlUhaTxzMq7ssA6Lh1AzSpmPIfjjO10v2iE7IAAAAASUVORK5CYII=" alt="can't watch that" />
                  상점오픈일
                  <span>
                    <Moment fromNow>{user?.createdAt}</Moment>
                  </span>
                </div>
                <div>
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAAQBJREFUSA1jZCASNOz/z3L34Z1aBkaGZLCW/wxzleVVmhscGf8QYwQLMYpAakCW/GdgqGMAElBQBxQDMethAvhoJnySKHIwnyALYhNDlkdiE28RkiZymMRbBIwTDAuwiWEogggQHUegiAfHCSy4oIkBh7kjQJgxdtHtUIZ/jJP+M/yXoIV/GRkYXzAw/c9joqUlIIeDPQD0CPGpjkLvMoG8BfYehQbh0g4LOkZcCkDiMQtuIwocfAqhcksSVHGaR8egI8Kl1FAy6iOyQ5HoQhVkA3qqIiVVjsYR2XE0woIOubBFZsPCD1kMmQ2TR6bxBx20ZAcbAmQjawSzCckjaQAAJL9HBV3GwxoAAAAASUVORK5CYII=" alt="can't watch that" />
                  상점방문수
                  <span>0명</span>
                </div>
                <div>
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAAl1JREFUSA21Vc9PE1EQnnktW2yIFy9GiCduSki4QjSGwA3qj248q/HCwQtnwg//CxKrMd4WMO2RQrxwkbQmBI0XExMxqQk3TTAt7Q4zu91l231btrq85KWz33wz39v3vn0F6HOYO7nHMvssA+ynwPxgXrebjc9So9LGbeue9StuvYpLFJ592lgHomsynbiP4thC+XLuCQDN8Rb8limxi8VTi7V1Ztm8SVQ/JICriPhUWhNRwRHFzJg1Y/24SO7CN+KGSNAotEVKGzPF1zJZsCSYk2POfwvld+8vsNg0dzq+klXPvYYSCyY54Xh41G/PlbDLRu3T+gEXZ1UKH1rTxffBRuZu7oHdoi3GTtRAZpxd+C2YD8aRW7dCK4pF3jA5y9v0tltEmggmOeEIV2oE143IxJedT4tcMAmARwjGC12xYG4Oj4TbrtFSMV+e/0kEw9psYiDWFBDuJ9YvohEiVWXrPkbkk4QrSim69DcCTFXV0CBUENBOcvndvQYNrKrCVOkPXyhfu5OhZ4SmAlxWqcyIMzlmyzVDvBCAtXd3tmppB0c2BNGtECcAKMKX1mxxLQCtmds5sIFWA1goFCMI6H5HGMMQKeNVqIsOC5Gg4gvxfXV5hmAj+EJj6YlDvkr+hhcTQFqNZ4EnN9RhXSQxgkD+pfpoe36Pn/nKiRhiBj4n8LaLRWykJSBwz1lbhrXN2eINSfkkfqN93sJoIW7oHHyrfn74/IfUa3hGEI5/qWIcQ/Tqqs85RugQggEjeUO0jdAhZN21vvOBHesX9m+oZ4QOIaeVfLiJDfdG8NqdARu11RN7gt5lAAAAAElFTkSuQmCC" alt="can't watch that" />
                  상품판매
                  <span>0회</span>
                </div>
                <div>
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAAQlJREFUSA1jZEACoceOcf5k+HqV4T+DIpIwnMnEzGyywcLpLEgg4MQ+439//56BSyIzGBnuszNwa6+2svoOE2aCMUD0r/9fq3FZgqyOIBvoULBZSArhFvmd3qfOwMhQiiRHGRNoFthMqClwixh//536/z8DG2WmI3SDzAKZCRMBWxRwbG8kUMIZJkgtGmQmyGyQeUzRJ07w/WP430ctw9HNAZkNsoPly9+vLQwM/yXQFVCN//+/BMgOFkZWpnmM/xgXEmOwGAvfdZg6EPsVwycTGB8vzcT4F6/8kJRkDDi2J40eLmf59///THpYBM+wtLZs1CKyQ3g06EaDDh4Co4kBHhSkMoZf0AEAMN1RWGgFcjgAAAAASUVORK5CYII=" alt="can't watch that" />
                  택배발송
                  <span>0회</span>
                </div>
              </div>
              {intro ? (
                <IntroductionModify>
                  <form>
                    <textarea
                      name="text"
                      id="text"
                      onChange={onChange}
                      value={text}
                      placeholder="소개글 입력"
                    />

                    <button onClick={handleSubmit}>확인</button>
                  </form>
                </IntroductionModify>
              ) : (
                <div>{user?.introduction}</div>
              )}
              {intro ? null : (
                <div>
                  <IntroModify onClick={clickModify}>소개글 수정</IntroModify>
                </div>
              )}
            </MyInfo>
            </div>
          </div>
          <div>
            <MenuBox>
              <Link to="products">
                상품<b>{user?.products.length}</b>
              </Link>
              <Link to="comments">상점문의</Link>
              <Link to="favorites">
                찜<b>{user?.favorites.length}</b>
              </Link>
              <Link to="reviews">
                상점후기<b>{user?.reviews.length}</b>
              </Link>
              <Link to="followings">
                팔로잉<b>{user?.followings.length}</b>
              </Link>
              <Link to="followers">
                팔로워<b>{user?.followers.length}</b>
              </Link>
            </MenuBox>
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </Container>
      <Footer />
    </Wrapper>
  );
};

export default Shop;
