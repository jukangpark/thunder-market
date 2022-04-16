import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Wrapper } from "../../components/commonStyle/fundamental";
import Footer from "../../components/Footer";
import Header from "../../components/header/Header";
import MiniHeader from "../../components/header/MiniHeader";
import ProductList from "../../components/ProductList";
import { IProduct } from "../../interface";

const Keyword = styled.span`
  color: ${(props) => props.theme.accentColor};
`;

const Title = styled.h1`
  margin: 50px 0px 24px;
`;

const Categories = styled.div`
  display: grid;
  line-height: 50px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  box-sizing: border-box;
  font-size: 13px;

  > option {
    cursor: pointer;
    box-shadow: rgb(238 238 238) 0px 1px 1px 0px;
    padding-left: 20px;
  }
`;

const Result = () => {
  const [products, setProducts] = useState<IProduct[]>();

  const {
    state: { keyword },
  } = useLocation() as any;

  console.log("useLocation 이 전달한", keyword);

  useEffect(() => {
    fetch(`/productapi/search?keyword=${keyword}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      });
  }, []);

  return (
    <Wrapper>
      <MiniHeader />
      <Header />
      <Title style={{ fontWeight: "bold", fontSize: "15px" }}>카테고리</Title>
      <Categories>
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
      </Categories>
      <Title>
        <Keyword>{keyword}</Keyword>의 검색결과{" "}
        <span style={{ color: "rgb(136, 136, 136)", marginLeft: "5px" }}>
          {products?.length}개
        </span>
      </Title>
      <ProductList products={products} />
      <Footer />
    </Wrapper>
  );
};

export default Result;
