import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import { Wrapper } from "../../components/commonStyle/fundamental";
import MiniHeader from "../../components/header/MiniHeader";
import Header from "../../components/header/Header";
import { IUser } from "../../interface";
import Footer from "../../components/Footer";

const Container = styled.div`
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
`;
const ShopWrapper = styled.div`
  width: 1024px;
  margin-top: 30px;
  > div:first-child {
    margin-bottom: 30px;
    > div {
      display: flex;
      width: 100%;
    }
  }
`;
const Profile = styled.div`
  flex-shrink: 0;
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
`;
const ShopNameModify = styled.button`
  margin-left: 10px;
  height: 20px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  padding: 0 5px;
  color: rgb(136, 136, 136);
  border: 1px solid rgb(238, 238, 238);
  font-size: 11px;
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
const TextBox = styled.div`
  margin-right: 30px;
  font-size: 13px;
  color: ${(props) => props.theme.textColor};
  display: flex;
  > div {
    margin-left: 5px;
    color: ${(props) => props.theme.textColor};
  }
`;
const TextImg = styled.img`
  width: 14px;
  height: 13px;
  margin-right: 10px;
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
const ProfileBg = styled.div`
  position: absolute;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 0;
  width: 100%;
  height: 100%;
  background-image: url("/pc-static/media/pattern-shop.066ca385.png");
  background-color: rgb(181, 181, 181);
`;
const ProfileImg = styled.div`
  border-radius: 50%;
  margin-bottom: 15px;
  width: 100px;
  height: 100px;
  cursor: pointer;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxjaXJjbGUgZmlsbD0iI0ZBRkFGQSIgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIi8+CiAgICAgICAgPHBhdGggZD0iTTM2LjIxNiA0MS42ODNjLjI0OC0xLjkzMS40OTgtMy44NjIuNzUtNS43OTRoNi43OWwtLjI4MyA1LjUzN2MwIC4wMTcuMDA3LjAzNC4wMDcuMDUxLS4wMDIuMDEtLjAwMi4wMi0uMDAyLjAzLS4wOTggMS44NzYtMS44OTcgMy4zOTItNC4wMzUgMy4zOTItMS4wNjYgMC0yLjAxOC0uMzktMi42MTUtMS4wNzItLjUxLS41ODUtLjcyMi0xLjMyNS0uNjEyLTIuMTQ0em04Ljg4OCA0LjA3OGMxLjIyNCAxLjI4OSAzLjAwOSAyLjAyOCA0Ljg5IDIuMDI4IDEuODkgMCAzLjY3NC0uNzQgNC45LTIuMDMzLjEwNy0uMTEyLjIwNy0uMjI4LjMwNC0uMzQ1IDEuMjggMS40NDcgMy4yMTcgMi4zNzggNS4zNSAyLjM3OC4xMTIgMCAuMjE2LS4wMjcuMzI4LS4wMzJWNjMuNkgzOS4xMTVWNDcuNzU3Yy4xMTIuMDA1LjIxNS4wMzIuMzI4LjAzMiAyLjEzMyAwIDQuMDcxLS45MzEgNS4zNTEtMi4zOC4wOTkuMTIxLjIuMjM4LjMxLjM1MnptMS41NDUtOS44NzJoNi42OThsLjI4MiA1LjYxOWMwIC4wMTUtLjAwNy4wMjctLjAwNy4wNGwuMDA0LjA4NmEyLjkzOSAyLjkzOSAwIDAgMS0uODI2IDIuMTMyYy0xLjM2NyAxLjQ0LTQuMjMzIDEuNDQxLTUuNjA0LjAwM2EyLjk1IDIuOTUgMCAwIDEtLjgzLTIuMTQybC4wMDQtLjA3OGMwLS4wMTYtLjAwOC0uMDMtLjAwOC0uMDQ4bC4yODctNS42MTJ6bTE2LjM3NiAwYy4yNTIgMS45MzMuNTAyIDMuODY1Ljc1MyA1LjgwNC4xMDkuODEtLjEwNCAxLjU0Ny0uNjE0IDIuMTMyLS41OTYuNjgzLTEuNTUgMS4wNzQtMi42MTYgMS4wNzQtMi4xMzcgMC0zLjkzMi0xLjUxNC00LjAzNC0zLjM4OGEuMzU5LjM1OSAwIDAgMC0uMDAzLS4wNDRjMC0uMDE1LjAwNi0uMDI3LjAwNi0uMDRsLS4yNzgtNS41MzhoNi43ODZ6TTM2LjIyNiA0Ni45NDZ2MTguMDk4YzAgLjc5OC42NDYgMS40NDUgMS40NDQgMS40NDVoMjQuNjVjLjc5OSAwIDEuNDQ1LS42NDcgMS40NDUtMS40NDVWNDYuOTQ2Yy41OS0uMzI4IDEuMTM3LS43MTkgMS41NzUtMS4yMiAxLjA2MS0xLjIxNCAxLjUyMi0yLjc4NSAxLjMwMS00LjQxLS4zLTIuMzU1LS42MDctNC43MDctLjkxOC03LjA2YTEuNDQzIDEuNDQzIDAgMCAwLTEuNDMxLTEuMjU3SDM1LjY5OWMtLjcyNCAwLTEuMzM4LjUzOC0xLjQzMSAxLjI1Ny0uMzExIDIuMzU0LS42MTcgNC43MDctLjkxNiA3LjA1LS4yMjEgMS42MzcuMjQgMy4yMDggMS4zIDQuNDIxLjQzOS41MDIuOTg0Ljg5MyAxLjU3NCAxLjIyeiIgZmlsbD0iI0NDQyIvPgogICAgPC9nPgo8L3N2Zz4K");
`;
const ShopName = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
  color: rgb(255, 255, 255);
`;

const Scope = styled.div`
  display: flex;
`;
const StarImg = styled.img`
  vertical-align: bottom;
  width: 15px;
  height: 14px;
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
  a {
    cursor: pointer;
    text-align: center;
    width: 20%;
    align-items: center;
    display: block;
    border: 1px solid rgb(238, 238, 238);
    border-left: 0;
    background-color: ${(props) => props.theme.bgColor};
  }
`;

const Shop = () => {
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    fetch("/user/info")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);
  console.log(user)
  return (
    <Wrapper>
      <MiniHeader />
      <Header />
      <Container>
        <ShopWrapper>
          <div>
            <div>
              <Profile>
                <div>
                  <ProfileSize>
                    <div>
                      <ProfileBg></ProfileBg>
                    </div>
                    <div>
                      <ProfileImg></ProfileImg>
                      <ShopName>{user?.email}</ShopName>
                      <Scope>
                        <StarImg src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAYAAAB2+A+pAAAAAXNSR0IArs4c6QAAAqNJREFUSA2tVk1rE0EYzrYbSKQXRYIfCaUiggaJJiH+AIsnL1poRQ+CBy8VvOivUA8evHgoeNCbRz3pH5B8HlIvYpG0VULxJBqMZn2eZWc7O5nZ7I5deJl33vf5yMzsTpvJWD6tVussw5KembMlgnc9CCsJa2PP81YYVq4gOTbEXq+3NB6PP5ObzWZPVSqVrbQ6ViuGKbfZf+Rc1JKMVsaO44RbLOdJDAUm9Va32+0TONtthM+FsYcoVqvVXSGaZEy9YhheE6Y0YM5aEjMZk9oY5PB8JSFdTWpPp6m2utlsHoXEN8S8IvUX82P1en1PqRunbrfbvYitOmRESI3JZLIMrGpKxDzOeb3T6byT4MYU2J8Orz2IvQLqghF5sI0ujG/O1Wq1j/l8/hImjxHewXrsq1GbHvSiZ+SM8alcxupfIE7uU/4/g+EO4jY+ufdCLWLMYr/fPzIajZ7DPLwkBNhmhOHrXC53t1wuf5f5U8aiidXfgflTxIKopRlh+ANxH6vc0PGMxgTjxTsN45dIGzpyTO0DTG/hLD+ZMLHGJMHYxep7GM+ZROQ6DDexygrGP3JdzWfeXPg2D8P0jEo0zYklx9QX9ZnGAPIlcwUhwUjszBdzpjFWcCOBWQSShBN7xribj+Os+Cdw6gei7l+P6C1HXDFBb4J6EXf3V7Un5lOCohGMq6opRH+j9wAv0BUG86AWUgPOaljQJLHGEFyTOZhvIhpYyROMvAK9IG+wp2AjXLnH3LjV+IQW8cu3ED4Gws8KhcLDUqn0SxXhfDAY5IfD4SPg1zkPftgSduUL5+pjXDEEuM3gO0OQruIyuGcypSh7xBBLDrnUYE/3xBnzbX7ruu55bOcbHVlXI5YccmGc7ovA/81FXJf+lunEk9aoQS0d/h/pAwlu3rYpxwAAAABJRU5ErkJggg==" />
                        <StarImg src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAYAAAB2+A+pAAAAAXNSR0IArs4c6QAAAqNJREFUSA2tVk1rE0EYzrYbSKQXRYIfCaUiggaJJiH+AIsnL1poRQ+CBy8VvOivUA8evHgoeNCbRz3pH5B8HlIvYpG0VULxJBqMZn2eZWc7O5nZ7I5deJl33vf5yMzsTpvJWD6tVussw5KembMlgnc9CCsJa2PP81YYVq4gOTbEXq+3NB6PP5ObzWZPVSqVrbQ6ViuGKbfZf+Rc1JKMVsaO44RbLOdJDAUm9Va32+0TONtthM+FsYcoVqvVXSGaZEy9YhheE6Y0YM5aEjMZk9oY5PB8JSFdTWpPp6m2utlsHoXEN8S8IvUX82P1en1PqRunbrfbvYitOmRESI3JZLIMrGpKxDzOeb3T6byT4MYU2J8Orz2IvQLqghF5sI0ujG/O1Wq1j/l8/hImjxHewXrsq1GbHvSiZ+SM8alcxupfIE7uU/4/g+EO4jY+ufdCLWLMYr/fPzIajZ7DPLwkBNhmhOHrXC53t1wuf5f5U8aiidXfgflTxIKopRlh+ANxH6vc0PGMxgTjxTsN45dIGzpyTO0DTG/hLD+ZMLHGJMHYxep7GM+ZROQ6DDexygrGP3JdzWfeXPg2D8P0jEo0zYklx9QX9ZnGAPIlcwUhwUjszBdzpjFWcCOBWQSShBN7xribj+Os+Cdw6gei7l+P6C1HXDFBb4J6EXf3V7Un5lOCohGMq6opRH+j9wAv0BUG86AWUgPOaljQJLHGEFyTOZhvIhpYyROMvAK9IG+wp2AjXLnH3LjV+IQW8cu3ED4Gws8KhcLDUqn0SxXhfDAY5IfD4SPg1zkPftgSduUL5+pjXDEEuM3gO0OQruIyuGcypSh7xBBLDrnUYE/3xBnzbX7ruu55bOcbHVlXI5YccmGc7ovA/81FXJf+lunEk9aoQS0d/h/pAwlu3rYpxwAAAABJRU5ErkJggg==" />
                        <StarImg src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAYAAAB2+A+pAAAAAXNSR0IArs4c6QAAAqNJREFUSA2tVk1rE0EYzrYbSKQXRYIfCaUiggaJJiH+AIsnL1poRQ+CBy8VvOivUA8evHgoeNCbRz3pH5B8HlIvYpG0VULxJBqMZn2eZWc7O5nZ7I5deJl33vf5yMzsTpvJWD6tVussw5KembMlgnc9CCsJa2PP81YYVq4gOTbEXq+3NB6PP5ObzWZPVSqVrbQ6ViuGKbfZf+Rc1JKMVsaO44RbLOdJDAUm9Va32+0TONtthM+FsYcoVqvVXSGaZEy9YhheE6Y0YM5aEjMZk9oY5PB8JSFdTWpPp6m2utlsHoXEN8S8IvUX82P1en1PqRunbrfbvYitOmRESI3JZLIMrGpKxDzOeb3T6byT4MYU2J8Orz2IvQLqghF5sI0ujG/O1Wq1j/l8/hImjxHewXrsq1GbHvSiZ+SM8alcxupfIE7uU/4/g+EO4jY+ufdCLWLMYr/fPzIajZ7DPLwkBNhmhOHrXC53t1wuf5f5U8aiidXfgflTxIKopRlh+ANxH6vc0PGMxgTjxTsN45dIGzpyTO0DTG/hLD+ZMLHGJMHYxep7GM+ZROQ6DDexygrGP3JdzWfeXPg2D8P0jEo0zYklx9QX9ZnGAPIlcwUhwUjszBdzpjFWcCOBWQSShBN7xribj+Os+Cdw6gei7l+P6C1HXDFBb4J6EXf3V7Un5lOCohGMq6opRH+j9wAv0BUG86AWUgPOaljQJLHGEFyTOZhvIhpYyROMvAK9IG+wp2AjXLnH3LjV+IQW8cu3ED4Gws8KhcLDUqn0SxXhfDAY5IfD4SPg1zkPftgSduUL5+pjXDEEuM3gO0OQruIyuGcypSh7xBBLDrnUYE/3xBnzbX7ruu55bOcbHVlXI5YccmGc7ovA/81FXJf+lunEk9aoQS0d/h/pAwlu3rYpxwAAAABJRU5ErkJggg==" />
                        <StarImg src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAYAAAB2+A+pAAAAAXNSR0IArs4c6QAAAqNJREFUSA2tVk1rE0EYzrYbSKQXRYIfCaUiggaJJiH+AIsnL1poRQ+CBy8VvOivUA8evHgoeNCbRz3pH5B8HlIvYpG0VULxJBqMZn2eZWc7O5nZ7I5deJl33vf5yMzsTpvJWD6tVussw5KembMlgnc9CCsJa2PP81YYVq4gOTbEXq+3NB6PP5ObzWZPVSqVrbQ6ViuGKbfZf+Rc1JKMVsaO44RbLOdJDAUm9Va32+0TONtthM+FsYcoVqvVXSGaZEy9YhheE6Y0YM5aEjMZk9oY5PB8JSFdTWpPp6m2utlsHoXEN8S8IvUX82P1en1PqRunbrfbvYitOmRESI3JZLIMrGpKxDzOeb3T6byT4MYU2J8Orz2IvQLqghF5sI0ujG/O1Wq1j/l8/hImjxHewXrsq1GbHvSiZ+SM8alcxupfIE7uU/4/g+EO4jY+ufdCLWLMYr/fPzIajZ7DPLwkBNhmhOHrXC53t1wuf5f5U8aiidXfgflTxIKopRlh+ANxH6vc0PGMxgTjxTsN45dIGzpyTO0DTG/hLD+ZMLHGJMHYxep7GM+ZROQ6DDexygrGP3JdzWfeXPg2D8P0jEo0zYklx9QX9ZnGAPIlcwUhwUjszBdzpjFWcCOBWQSShBN7xribj+Os+Cdw6gei7l+P6C1HXDFBb4J6EXf3V7Un5lOCohGMq6opRH+j9wAv0BUG86AWUgPOaljQJLHGEFyTOZhvIhpYyROMvAK9IG+wp2AjXLnH3LjV+IQW8cu3ED4Gws8KhcLDUqn0SxXhfDAY5IfD4SPg1zkPftgSduUL5+pjXDEEuM3gO0OQruIyuGcypSh7xBBLDrnUYE/3xBnzbX7ruu55bOcbHVlXI5YccmGc7ovA/81FXJf+lunEk9aoQS0d/h/pAwlu3rYpxwAAAABJRU5ErkJggg==" />
                        <StarImg src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAYAAAB2+A+pAAAAAXNSR0IArs4c6QAAAqNJREFUSA2tVk1rE0EYzrYbSKQXRYIfCaUiggaJJiH+AIsnL1poRQ+CBy8VvOivUA8evHgoeNCbRz3pH5B8HlIvYpG0VULxJBqMZn2eZWc7O5nZ7I5deJl33vf5yMzsTpvJWD6tVussw5KembMlgnc9CCsJa2PP81YYVq4gOTbEXq+3NB6PP5ObzWZPVSqVrbQ6ViuGKbfZf+Rc1JKMVsaO44RbLOdJDAUm9Va32+0TONtthM+FsYcoVqvVXSGaZEy9YhheE6Y0YM5aEjMZk9oY5PB8JSFdTWpPp6m2utlsHoXEN8S8IvUX82P1en1PqRunbrfbvYitOmRESI3JZLIMrGpKxDzOeb3T6byT4MYU2J8Orz2IvQLqghF5sI0ujG/O1Wq1j/l8/hImjxHewXrsq1GbHvSiZ+SM8alcxupfIE7uU/4/g+EO4jY+ufdCLWLMYr/fPzIajZ7DPLwkBNhmhOHrXC53t1wuf5f5U8aiidXfgflTxIKopRlh+ANxH6vc0PGMxgTjxTsN45dIGzpyTO0DTG/hLD+ZMLHGJMHYxep7GM+ZROQ6DDexygrGP3JdzWfeXPg2D8P0jEo0zYklx9QX9ZnGAPIlcwUhwUjszBdzpjFWcCOBWQSShBN7xribj+Os+Cdw6gei7l+P6C1HXDFBb4J6EXf3V7Un5lOCohGMq6opRH+j9wAv0BUG86AWUgPOaljQJLHGEFyTOZhvIhpYyROMvAK9IG+wp2AjXLnH3LjV+IQW8cu3ED4Gws8KhcLDUqn0SxXhfDAY5IfD4SPg1zkPftgSduUL5+pjXDEEuM3gO0OQruIyuGcypSh7xBBLDrnUYE/3xBnzbX7ruu55bOcbHVlXI5YccmGc7ovA/81FXJf+lunEk9aoQS0d/h/pAwlu3rYpxwAAAABJRU5ErkJggg==" />
                      </Scope>
                      <ShopManagement>
                        <Link to="/products/manage">내 상점 관리</Link>
                      </ShopManagement>
                    </div>
                  </ProfileSize>
                </div>
              </Profile>
              <MyInfo>
                <div>
                  <InfoName>
                    {user?.email}
                    <ShopNameModify>상점명 수정</ShopNameModify>
                  </InfoName>
                  <SelfAuth>본인인증 완료</SelfAuth>
                </div>
                <div>
                  <TextBox>
                    <TextImg src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAAfBJREFUSA3tU79rFFEQntkcuBesDF5pdyRFrjNaiJBgERA0pEh1P4yCC4rWFiH/gIWN1W4iIclZeKRIlS6gSZkUQQsbOwtBwUp2n4f3xm827LK32eICd90NHDvvm+/N9+bHMcGioHEkInfVH7Yx86ey155n2WlWTCQ/hMQZtojmY6ae67gVxxhaGpWIConQhBFzH1XYZQVGaWL5obbr3ihFNDcTLVLoN06KhICfdTdbt/IxE9SfG7/xLI93/ebtKGi+y+N6DoPGTwfD+iNbq26WIAcvr+AV1Z6V6SyuvhDVLNMFvEdSw6xrF/jIzUKfIcR7pvvvjXQ6E3EiEY6+/36NS5OY3yvZbk0ll8PNR3dI+DEe8eSvvzqT4JHfugF/HZOfMxtNL8E1p+ZWDdyJS3vLIovYxVM8WV82m5CB/QL2EcRrxDKvW6QxJg5R3eG5Lwvwr2bunID/DcI3QfxQ9t6vlzSIsr5YkRcIVFNy4ohch7uCRHHfUjiumB7k4PMwKgN/Tg8lLu3rdyR/Uk2ct7FQviMDn+NlyLOxUW12+DiLW2v95Ix1PcavnZzzX7Gyhs3VlU+tWAgi7tPdIGXBCf16KoR1/+p6/fE+blD3wOkTGi9DtkOX8gtnpIPvm8mlUhaTxzMq7ssA6Lh1AzSpmPIfjjO10v2iE7IAAAAASUVORK5CYII=" />
                    상점오픈일
                    <div>1일 전</div>
                  </TextBox>
                  <TextBox>
                    <TextImg src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAAQBJREFUSA1jZCASNOz/z3L34Z1aBkaGZLCW/wxzleVVmhscGf8QYwQLMYpAakCW/GdgqGMAElBQBxQDMethAvhoJnySKHIwnyALYhNDlkdiE28RkiZymMRbBIwTDAuwiWEogggQHUegiAfHCSy4oIkBh7kjQJgxdtHtUIZ/jJP+M/yXoIV/GRkYXzAw/c9joqUlIIeDPQD0CPGpjkLvMoG8BfYehQbh0g4LOkZcCkDiMQtuIwocfAqhcksSVHGaR8egI8Kl1FAy6iOyQ5HoQhVkA3qqIiVVjsYR2XE0woIOubBFZsPCD1kMmQ2TR6bxBx20ZAcbAmQjawSzCckjaQAAJL9HBV3GwxoAAAAASUVORK5CYII=" />
                    상점방문수
                    <div>0명</div>
                  </TextBox>
                  <TextBox>
                    <TextImg src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAAl1JREFUSA21Vc9PE1EQnnktW2yIFy9GiCduSki4QjSGwA3qj248q/HCwQtnwg//CxKrMd4WMO2RQrxwkbQmBI0XExMxqQk3TTAt7Q4zu91l231btrq85KWz33wz39v3vn0F6HOYO7nHMvssA+ynwPxgXrebjc9So9LGbeue9StuvYpLFJ592lgHomsynbiP4thC+XLuCQDN8Rb8limxi8VTi7V1Ztm8SVQ/JICriPhUWhNRwRHFzJg1Y/24SO7CN+KGSNAotEVKGzPF1zJZsCSYk2POfwvld+8vsNg0dzq+klXPvYYSCyY54Xh41G/PlbDLRu3T+gEXZ1UKH1rTxffBRuZu7oHdoi3GTtRAZpxd+C2YD8aRW7dCK4pF3jA5y9v0tltEmggmOeEIV2oE143IxJedT4tcMAmARwjGC12xYG4Oj4TbrtFSMV+e/0kEw9psYiDWFBDuJ9YvohEiVWXrPkbkk4QrSim69DcCTFXV0CBUENBOcvndvQYNrKrCVOkPXyhfu5OhZ4SmAlxWqcyIMzlmyzVDvBCAtXd3tmppB0c2BNGtECcAKMKX1mxxLQCtmds5sIFWA1goFCMI6H5HGMMQKeNVqIsOC5Gg4gvxfXV5hmAj+EJj6YlDvkr+hhcTQFqNZ4EnN9RhXSQxgkD+pfpoe36Pn/nKiRhiBj4n8LaLRWykJSBwz1lbhrXN2eINSfkkfqN93sJoIW7oHHyrfn74/IfUa3hGEI5/qWIcQ/Tqqs85RugQggEjeUO0jdAhZN21vvOBHesX9m+oZ4QOIaeVfLiJDfdG8NqdARu11RN7gt5lAAAAAElFTkSuQmCC" />
                    상품판매
                    <div>0회</div>
                  </TextBox>
                  <TextBox>
                    <TextImg src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAAQlJREFUSA1jZEACoceOcf5k+HqV4T+DIpIwnMnEzGyywcLpLEgg4MQ+439//56BSyIzGBnuszNwa6+2svoOE2aCMUD0r/9fq3FZgqyOIBvoULBZSArhFvmd3qfOwMhQiiRHGRNoFthMqClwixh//536/z8DG2WmI3SDzAKZCRMBWxRwbG8kUMIZJkgtGmQmyGyQeUzRJ07w/WP430ctw9HNAZkNsoPly9+vLQwM/yXQFVCN//+/BMgOFkZWpnmM/xgXEmOwGAvfdZg6EPsVwycTGB8vzcT4F6/8kJRkDDi2J40eLmf59///THpYBM+wtLZs1CKyQ3g06EaDDh4Co4kBHhSkMoZf0AEAMN1RWGgFcjgAAAAASUVORK5CYII=" />
                    택배발송
                    <div>0회</div>
                  </TextBox>
                </div>
                <div></div>
                <div>
                  <IntroModify>소개글 수정</IntroModify>
                </div>
              </MyInfo>
            </div>
          </div>
          <div>
            <MenuBox>
              <Link to="products">상품</Link>
              <Link to="comments">상점문의</Link>
              <Link to="favorites">찜</Link>
              <Link to="reviews">상점후기</Link>
              <Link to="followings">팔로잉</Link>
              <Link to="followers">팔로워</Link>
            </MenuBox>
          </div>
          <div>
            <Outlet />
          </div>
        </ShopWrapper>
      </Container>
      <Footer />
    </Wrapper>
  );
};

export default Shop;
