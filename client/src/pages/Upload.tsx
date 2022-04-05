import { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
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

const Upload = () => {
  const [state, setState] = useState({
    file: null,
    base64URL: "",
  });

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
          action="/productapi/upload"
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
            required
          />

          <input
            type="text"
            placeholder="상품제목을 입력해주세요."
            name="name"
            required
          />

          <label htmlFor="categories">카테고리 : </label>
          <select name="categories" required>
            <option value="여성의류">여성의류</option>
            <option value="남성의류">남성의류</option>
            <option value="신발">신발</option>
            <option value="가방">가방</option>
            <option value="쥬얼리">주얼리</option>
            <option value="액세서리">패션 액세서리</option>
            <option value="디지털">디지털</option>
            <option value="스포츠">스포츠</option>
            <option value="차량">차량/오토바이</option>
            <option value="스타굿즈">스타굿즈</option>
            <option value="키덜트">키덜트</option>
            <option value="예술">예술</option>
            <option value="악기">악기</option>
            <option value="도서">도서</option>
            <option value="뷰티">뷰티/미용</option>
            <option value="인테리어">가구/인테리어</option>
            <option value="생활">생활</option>
            <option value="유아동">유아동/출산</option>
            <option value="펫">반려동물용품</option>
            <option value="기타">기타</option>
            <option value="지역서비스">지역 서비스</option>
            <option value="원룸">원룸</option>
            <option value="번개나눔">번개나눔</option>
            <option value="구인구직">구인구직</option>
            <option value="재능">재능</option>
            <option value="커뮤니티">커뮤니티</option>
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
            required
          />

          <input placeholder="hashtags" name="hashtags" required />

          <button>등록</button>
        </Form>
      </div>
    </Wrapper>
  );
};

export default Upload;
