import { HelmetProvider, Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Btn,
  BtnContainer,
  Form,
  Title,
  Wrapper,
  Error,
  IFormData,
} from "../../components/commonStyle/fundamental";
import MiniHeader from "../../components/header/MiniHeader";

const Join = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormData>();
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
          navigate("/");
        }
      });
  };
  return (
    <Wrapper>
      <HelmetProvider>
        <Helmet>
          <title>Thunder Market | join</title>
        </Helmet>
      </HelmetProvider>
      <MiniHeader />
      <Form onSubmit={handleSubmit(onValid)}>
        <Title>회원 가입</Title>
        <BtnContainer>
          <Btn style={{ backgroundColor: "#FEEC34", color: "black" }}>
            카카오 계정으로 신규 가입
          </Btn>
          <Btn style={{ backgroundColor: "black", color: "white" }}>
            깃헙 계정으로 신규 가입
          </Btn>
        </BtnContainer>

        <input
          placeholder="사용하실 ID 를 입력해주세요. (수신 가능한 E-mail)"
          type="email"
          {...register("email", {
            required: "ID 를 입력해주세요",
            pattern: {
              value:
                /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
              message: "올바르지 않은 이메일 형식입니다.",
            },
          })}
        />
        <Error>{errors.email?.message}</Error>
        <input
          placeholder="패스워드"
          type="password"
          {...register("password", { required: "비밀번호를 입력해주세요." })}
        />
        <Error>{errors.password?.message}</Error>
        <input
          placeholder="패스워드를 다시 입력해주세요."
          type="password"
          {...register("password2", {
            required: "비밀번호 확인을 입력해주세요.",
          })}
        />
        <Error>{errors.password2?.message}</Error>
        <Btn style={{ marginTop: "20px" }}>회원가입하기</Btn>
      </Form>
    </Wrapper>
  );
};

export default Join;
