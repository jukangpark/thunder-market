import styled from "styled-components";

export const Wrapper = styled.div`
  width: 1024px;
  margin: 0 auto;
`;

export const Form = styled.form`
  max-width: 420px;
  margin: 100px auto;
  input {
    width: 420px;
    height: 40px;
    margin-top: 20px;
    padding: 0px;
    padding-left: 10px;
    box-sizing: border-box;
    display: block;
  }
`;

export const Btn = styled.button`
  width: 420px;
  height: 40px;
  margin-top: 10px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  padding: 0;
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-top: 15px;
  text-align: center;
  margin-bottom: 40px;
  font-weight: bold;
`;

export const BtnContainer = styled.div`
  width: 420px;
`;

export const FollowBtn = styled.div`
  width: 100%;
  height: 32px;
  border: 1px solid rgb(238, 238, 238);
  color: rgb(136, 136, 136);
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  font-size: 13px;
  border-radius: 2px;
  cursor: pointer;
`;

export const Error = styled.div``;
