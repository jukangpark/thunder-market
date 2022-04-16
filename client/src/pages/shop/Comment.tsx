import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { ShopHeader, Title } from "../../components/commonStyle/LinkHeader";
import { IComment } from "../../interface";
import Moment from "react-moment";
import "moment/locale/ko";
import { useCookies } from "react-cookie";

const InquiryForm = styled.form`
  border-right: 1px solid rgb(238, 238, 238);
  border-bottom: 1px solid rgb(238, 238, 238);
  border-left: 1px solid rgb(238, 238, 238);
`;
const TextBox = styled.div`
  width: 100%;
  padding: 20px;
  height: 80px;
  border-bottom: 1px solid rgb(238, 238, 238);
  box-sizing: border-box;
`;
const InquiryText = styled.textarea`
  width: 100%;
  height: 100%;
  resize: none;
  font-size: 13px;
  line-height: 1.5;
  border: none;
  outline: none;
  color: ${(props) => props.theme.textColor};
  letter-spacing: -0.5px;
  font-synthesis: none;
  overflow-y: scroll;
`;
const TextLength = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  padding: 0px 10px;
  box-sizing: border-box;
`;
const Length = styled.div`
  margin-left: 10px;
  font-size: 12px;
  color: rgb(136, 136, 136);
`;
const Registration = styled.button`
  border: 1px solid rgb(238, 238, 238);
  height: 32px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  padding: 0px 20px;
  font-size: 13px;
  color: ${(props) => props.theme.btnColor};
  cursor: pointer;
`;
const CommentList = styled.ul`
  margin-top: 10px;
  > div {
    padding-top: 25px;
  }
`;
const CommentBox = styled.li`
  display: flex;
  width: 100%;
  > a {
    display: block;
    margin-right: 15px;
  }
`;
const ProfileImg = styled.img`
  border-radius: 50%;
  width: 48px;
  height: 48px;
`;
const CommentWrapper = styled.div`
  border-bottom: 1px solid rgb(238, 238, 238);
  width: 100%;
`;
const UserName = styled.div`
  display: flex;
  width: 100%;
  -webkit-box-pack: justify;
  justify-content: space-between;
  color: ${(props) => props.theme.btnColor};
  margin-bottom: 10px;
  -webkit-box-align: center;
  align-items: center;
  font-size: 14px;
  > div {
    font-size: 13px;
    color: rgb(204, 204, 204);
  }
`;
const Text = styled.div`
  margin-bottom: 20px;
  line-height: 1.5;
  white-space: pre-wrap;
`;
const DeleteBox = styled.div`
  display: flex;
  margin-bottom: 20px;
  > div:last-child {
    border-right: 0;
  }
`;
const Btn = styled.div`
  color: ${(props) => props.theme.btnColor};
  font-size: 13px;
  display: flex;
  -webkit-box-align: unset;
  align-items: unset;
  margin-right: 25px;
  position: relative;
  cursor: pointer;
  ::after {
    content: "";
    width: 1px;
    height: 13px;
    position: absolute;
    border-right: 1px solid rgb(238, 238, 238);
    top: 1px;
    right: -14px;
  }
  :last-child::after {
    border-right: 0;
  }
`;
const CommentImg = styled.img`
  margin-right: 4px;
  width: 17px;
  height: 14px;
`;
const DeleteImg = styled.img`
  width: 15px;
  height: 14px;
  margin-right: 4px;
`;
const Comment = () => {
  const [comments, setComments] = useState<IComment[]>();
  const [text, setText] = useState("");
  const { id } = useParams();
  const [cookies] = useCookies();

  const isLoggedIn = Boolean(cookies.user);

  const fetchComments = () => {
    fetch(`/user/${id}/comments`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const {
      currentTarget: { value },
    } = event;

    setText(value);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await fetch(`/user/${id}/comments`, {
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

    setText("");

    fetchComments();
  };

  const deleteComment = async (event: React.MouseEvent<HTMLElement>) => {
    const { commentid } = event.currentTarget.dataset;

    await fetch(`/user/${id}/comments`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        commentid,
      }),
    })
      .then((res) => res.json())
      .then((data) => alert(data.message));

    fetchComments();
  };

  return (
    <div>
      <ShopHeader>
        <Title>
          상점문의<span>{comments?.length}</span>
        </Title>
      </ShopHeader>
      {isLoggedIn ? (
        <InquiryForm onSubmit={onSubmit}>
          <TextBox>
            <InquiryText
              onChange={handleChange}
              id="text"
              name="text"
              required={true}
              placeholder="상점 문의 입력"
              maxLength={100}
              value={text}
            />
          </TextBox>
          <TextLength>
            <Length> {text.length} / 100</Length>
            <Registration>등록</Registration>
          </TextLength>
        </InquiryForm>
      ) : null}

      {comments?.map((comment, index) => (
        <CommentList key={index}>
          <div>
            <CommentBox>
              <Link to={"/"}>
                <ProfileImg src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxjaXJjbGUgZmlsbD0iI0ZBRkFGQSIgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIi8+CiAgICAgICAgPHBhdGggZD0iTTM2LjIxNiA0MS42ODNjLjI0OC0xLjkzMS40OTgtMy44NjIuNzUtNS43OTRoNi43OWwtLjI4MyA1LjUzN2MwIC4wMTcuMDA3LjAzNC4wMDcuMDUxLS4wMDIuMDEtLjAwMi4wMi0uMDAyLjAzLS4wOTggMS44NzYtMS44OTcgMy4zOTItNC4wMzUgMy4zOTItMS4wNjYgMC0yLjAxOC0uMzktMi42MTUtMS4wNzItLjUxLS41ODUtLjcyMi0xLjMyNS0uNjEyLTIuMTQ0em04Ljg4OCA0LjA3OGMxLjIyNCAxLjI4OSAzLjAwOSAyLjAyOCA0Ljg5IDIuMDI4IDEuODkgMCAzLjY3NC0uNzQgNC45LTIuMDMzLjEwNy0uMTEyLjIwNy0uMjI4LjMwNC0uMzQ1IDEuMjggMS40NDcgMy4yMTcgMi4zNzggNS4zNSAyLjM3OC4xMTIgMCAuMjE2LS4wMjcuMzI4LS4wMzJWNjMuNkgzOS4xMTVWNDcuNzU3Yy4xMTIuMDA1LjIxNS4wMzIuMzI4LjAzMiAyLjEzMyAwIDQuMDcxLS45MzEgNS4zNTEtMi4zOC4wOTkuMTIxLjIuMjM4LjMxLjM1MnptMS41NDUtOS44NzJoNi42OThsLjI4MiA1LjYxOWMwIC4wMTUtLjAwNy4wMjctLjAwNy4wNGwuMDA0LjA4NmEyLjkzOSAyLjkzOSAwIDAgMS0uODI2IDIuMTMyYy0xLjM2NyAxLjQ0LTQuMjMzIDEuNDQxLTUuNjA0LjAwM2EyLjk1IDIuOTUgMCAwIDEtLjgzLTIuMTQybC4wMDQtLjA3OGMwLS4wMTYtLjAwOC0uMDMtLjAwOC0uMDQ4bC4yODctNS42MTJ6bTE2LjM3NiAwYy4yNTIgMS45MzMuNTAyIDMuODY1Ljc1MyA1LjgwNC4xMDkuODEtLjEwNCAxLjU0Ny0uNjE0IDIuMTMyLS41OTYuNjgzLTEuNTUgMS4wNzQtMi42MTYgMS4wNzQtMi4xMzcgMC0zLjkzMi0xLjUxNC00LjAzNC0zLjM4OGEuMzU5LjM1OSAwIDAgMC0uMDAzLS4wNDRjMC0uMDE1LjAwNi0uMDI3LjAwNi0uMDRsLS4yNzgtNS41MzhoNi43ODZ6TTM2LjIyNiA0Ni45NDZ2MTguMDk4YzAgLjc5OC42NDYgMS40NDUgMS40NDQgMS40NDVoMjQuNjVjLjc5OSAwIDEuNDQ1LS42NDcgMS40NDUtMS40NDVWNDYuOTQ2Yy41OS0uMzI4IDEuMTM3LS43MTkgMS41NzUtMS4yMiAxLjA2MS0xLjIxNCAxLjUyMi0yLjc4NSAxLjMwMS00LjQxLS4zLTIuMzU1LS42MDctNC43MDctLjkxOC03LjA2YTEuNDQzIDEuNDQzIDAgMCAwLTEuNDMxLTEuMjU3SDM1LjY5OWMtLjcyNCAwLTEuMzM4LjUzOC0xLjQzMSAxLjI1Ny0uMzExIDIuMzU0LS42MTcgNC43MDctLjkxNiA3LjA1LS4yMjEgMS42MzcuMjQgMy4yMDggMS4zIDQuNDIxLjQzOS41MDIuOTg0Ljg5MyAxLjU3NCAxLjIyeiIgZmlsbD0iI0NDQyIvPgogICAgPC9nPgo8L3N2Zz4K" />
              </Link>
              <CommentWrapper>
                <UserName>
                  {comment.owner.username}
                  <Moment style={{ fontSize: "13px" }} fromNow>
                    {comment.createdAt}
                  </Moment>
                </UserName>
                <Text>{comment.text}</Text>
                <DeleteBox>
                  <Btn>
                    <CommentImg src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAcCAYAAAAEN20fAAAAAXNSR0IArs4c6QAABIFJREFUSA2tl0lok0EUx5M0tVYpsVvqRhQFe6gH0VKkWrFKl1TrQaSggsvR/eAKoiJCbxZRwV0Ul4N6UbCLbU314EatC0b0oJY0Rg1aEcS0DWn9vfRLnH79EmPNwMt787b5z8z7ZiZmUwLN5XJZ+/r6ivr7+xfhPn9gYGAi3G42m7OQf8D99L9Aj5Cb8XtQVVXVSz/hZo7n2dTUZA+FQptJvpEBs+P5qjb8f9I/Q0wdgLyqLZZsCERWoLe3dx+JdkGjteB++EvonnAG+2qxWL4ij2YF8vCbhG4BfCG6DMhEPwg7YbPZ9hQXFwdEF6sNA9LS0jIjGAxeJeEcCSKZDzoJnaqoqJAtiNtkEj09PdU4ySTmijOxr1NSUlaXl5c/jxU8BEhjY2MBwS4ol2CZTa3D4agtKCjoi5Ugnp6tdbJaZ8k3kXyyXeVOp/OhUUwUiKwEBXkfpzzIQ2A1QbIV/9WYXBZgLpJkKTmlsBdVVlZ26JNaRAFiC9txCTEPx3epqaklyQAhuRm02263LyfvTcaxAep6e3v7GLGpLQwE1NtwKsLwi710lpWVeVSn/5ULCwuDbHENYJ6Qa5rf7z+gz2l2u92jPB6PDyDZfAVbmMFxvVNDQ0O7XpdIn1UtVP2kBlmRDgBZIAdjfYrYrV6vt0pAYPDyVZyIGFSOPfwFqbqRyAzsZlJyvmwifiVUF8ljBWGN1rkAmFDEoHK2a8jMVNu/yoA4R4wAWQX9AUJnBiStaZAN/2Wlng7XjkzDSfuMVekkeiagmLt5QDJZIYcIKDuFG7VEa0RfE0a5NN07xpva1tYmR8Vn0VlRjBUhPT1djmvDhk9SakRJ7hOZa0Tur0EgLE0XA+VzmE1A+UEc9C2ZNaLlFgCmtLQ0ubHDTVZEzox8inYa3BBIMmtkcFjTdHigtLQ0ugtSI61QGbRMk2FDW6I1MjTKZDKqGXLlyw6wE7dVfwFyBarFuIrDbafRBYctmTWyTgNwXeNhZpWHCyhvM1h1V1fXbrSHVAeRk1Ujra2tUyjQrayGj1P8hjpO+PYFyFSAuDFYGXQONfFKdUqGTH6zTJhcTkCs4ZSVSzbawpcee9mJZi80iqJtqK+vl2JKagPEURI6WY1bTPSyPnkYiCjZoiM41YF8MryNC2q23nmkfUAcJnYz9Dg3N3cl+cOnqZovCkSUrMx2nI4KGOgRYPbxdkhVA0YikytF4sh9kyfBL6Mc0ReaamRrVtA/DWVCH6FjGRkZp0tKSr4jx23Nzc22zMzMoDqg9m9AHtzZgFrC6t/RJzEEIk5U+CRO2/2IawlOg4dIJJffXegt5EffjW6sDEBf3hqLkYvQf6MgD+bk5JyTRxE2E5Obi60RWzrdDYA5L/pIiwkk4sCrfHwgENhIkqXoZpHorzGRWGK68b8GKBf0DKCy5TegLHxO8oTcHlm5hJNKckDlcA7MQ5wM2UkoS93DID/gPj79Fwz2Htt6+E643K4xG0DfQKv5lDv+CUjMjAYG7f/NYgDK6302fDp8HFy2WQpXVusj/AMT2PEbeA0W2gj2azwAAAAASUVORK5CYII=" />
                    댓글달기
                  </Btn>
                  <Btn onClick={deleteComment} data-commentid={comment._id}>
                    <DeleteImg src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAYAAAB2+A+pAAAAAXNSR0IArs4c6QAAANpJREFUSA1jZCAB7N+/n+Xr16+1QC3J////lwZpZWRkfAqk5nJzczc7Ojr+AYkRA1iIUQRTA7IUaGEdjA+ioQ6oA8qBuPUgghjARIwiJDXJIDYzM7O7r68vIwiD2FB5sBySWrxMkiyGBa+Xl9cumKkwNkwOJk6IZty8efN/QopoIU+Sj2nhALiZoBCgZijgMm/AfDxqMTyu0RnocUWIj64fnT8a1OghQjP+aFDTLGjRDR4NavQQoRl/5AU10Y09UPsKOdwJ8ZHVYmOPvKAeMB/jjGNqtrsGVRwDANq3T3QbKT/vAAAAAElFTkSuQmCC" />
                    삭제하기
                  </Btn>
                </DeleteBox>
              </CommentWrapper>
            </CommentBox>
          </div>
        </CommentList>
      ))}
    </div>
  );
};

export default Comment;
