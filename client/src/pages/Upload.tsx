import { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Wrapper } from "../components/fundamental";
import Header from "../components/Header";

const Form = styled.form`
  width: 300px;
  margin: 20px auto;
  input {
    display: block;
  }
`;

// interface IProduct {
//   FileList: any;
//   name: string;
//   categories: string;
//   meta: {
//     views: number;
//   };
//   location: string;
//   newProduct: string;
//   change: string;
//   price: number;
//   delivery: boolean;
//   description: string;
//   hashtags: string;
// }

const Upload = () => {
  const [state, setState] = useState({
    file: null,
    base64URL: "",
  });
  const navigate = useNavigate();

  const getBase64 = (file: any) => {
    return new Promise((resolve) => {
      let baseURL: any = ""; // arrayBuffer 가 들어올 변수

      let reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  const handleFileInputChange = (event: any) => {
    const file = event.target.files[0];

    getBase64(file).then((result: any) => {
      file["base64"] = result;

      setState({
        base64URL: result,
        file,
      });
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
        <Form
          method="POST"
          action="/product/upload"
          encType="multipart/form-data"
        >
          {state.base64URL ? (
            <img
              style={{ width: "200px" }}
              src={state.base64URL}
              alt="이미지를 첨부해주세요"
            />
          ) : (
            <div
              style={{
                width: "200px",
                backgroundColor: "#999999",
                height: "200px",
              }}
            />
          )}

          <input
            type="file"
            id="productImage"
            name="productImage"
            onChange={handleFileInputChange}
          />

          <input
            type="text"
            placeholder="상품제목을 입력해주세요."
            name="name"
          />

          <label htmlFor="categories">카테고리 : </label>
          <select name="categories" required>
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

          <input placeholder="지역" name="location" />

          <select name="newProduct">
            <option value="중고상품">중고상품</option>
            <option value="새상품">새상품</option>
          </select>

          <select name="change">
            <option value="교환불가">교환불가</option>
            <option value="교환가능">교환가능</option>
          </select>

          <input placeholder="가격" type="number" name="price" />

          <label htmlFor="delivery">배송비 포함</label>
          <input type="checkbox" name="delivery" />

          <label htmlFor="description">설명</label>
          <textarea
            style={{ width: "100%", height: "200px" }}
            id="description"
            name="description"
          />

          <input placeholder="hashtags" name="hashtags" />

          <button>등록</button>
        </Form>
      </div>
    </Wrapper>
  );
};

export default Upload;
