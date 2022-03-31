import { Helmet, HelmetProvider } from "react-helmet-async";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Wrapper } from "../components/fundamental";
import Header from "../components/Header";

const Form = styled.form`
  width: 300px;
  margin: 0 auto;
  input {
    display: block;
  }
`;

interface IProduct {
  imageUrl: string[];
  name: string;
  categories: string[];
  meta: {
    views: number;
  };
  location: string;
  new: boolean;
  change: boolean;
  price: number;
  delivery: boolean;
  description: boolean;
  hashtags: string[];
}

const Upload = () => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<IProduct>();

  const onValid = ({ imageUrl, name }: IProduct) => {
    fetch("/product/upload", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imageUrl: ["asdfa"],
      }),
    });
  };

  return (
    <Wrapper>
      <HelmetProvider>
        <Helmet>
          <title>Thunder Market | upload</title>
        </Helmet>
      </HelmetProvider>
      <Header />
      <div>
        <Form onSubmit={handleSubmit(onValid)}>
          <input type="file" accept="image/*" {...register("imageUrl")} />
          <input type="text" placeholder="상품제목을 입력해주세요." />
          <select name="categories">
            <option value="womenclothing">여성의류</option>
            <option value="menclothing">남성의류</option>
            <option value="shoes">신발</option>
            <option value="bags">가방</option>
            <option value="jewelry">주얼리</option>
            <option value="accessories">패션 액세서리</option>
            <option value="digital">디지털</option>
            <option value="sports">스포츠</option>
            <option value="cars">차량/오토바이</option>
            <option value="stargoods">스타굿즈</option>
            <option value="kidult">키덜트</option>
            <option value="art">예술</option>
            <option value="instrument">악기</option>
            <option value="books">도서</option>
            <option value="beauty">뷰티/미용</option>
            <option value="interior">가구/인테리어</option>
            <option value="life">생활</option>
            <option value="baby">유아동/출산</option>
            <option value="pet">반려동물용품</option>
            <option value="etc">기타</option>
            <option value="communityService">지역 서비스</option>
            <option value="oneroom">원룸</option>
            <option value="share">번개나눔</option>
            <option value="job">구인구직</option>
            <option value="talent">재능</option>
            <option value="community">커뮤니티</option>
          </select>
          <button>내 위치</button>
          <button>주소 검색</button>
          <input placeholder="지역"></input>
          <select>
            <option>중고상품</option>
            <option>새상품</option>
          </select>
          <select>
            <option>교환불가</option>
            <option>교환가능</option>
          </select>
          <input placeholder="가격" type="number"></input>
          <label htmlFor="true">배송비 포함</label>
          <input type="checkbox" name="true"></input>
          <label htmlFor="description">설명</label>
          <textarea
            style={{ width: "100%", height: "200px" }}
            id="description"
          ></textarea>
          <input placeholder="hashtags"></input>
        </Form>
      </div>
    </Wrapper>
  );
};

export default Upload;
