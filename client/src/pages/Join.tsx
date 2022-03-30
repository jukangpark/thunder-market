import React from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";

interface IFormData {
  email: string;
  password: string;
  password2: string;
}

const Join = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<IFormData>();
  const onValid = ({ email, password, password2 }: IFormData) => {
    if (password !== password2) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    setValue("email", "");
    setValue("password", "");
    setValue("password2", "");

    fetch("/user/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        if (data.result === "ok") {
          alert(data.message);
          navigate("/");
        }
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input placeholder="email" type="email" {...register("email")} />
        <input
          placeholder="password"
          type="password"
          {...register("password")}
        />
        <input
          placeholder="비밀번호 확인"
          type="password"
          {...register("password2")}
        />
        <button>Join</button>
      </form>
    </div>
  );
};

export default Join;
