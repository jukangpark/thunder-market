import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IProducts } from "../interface";
import {
  Description,
  ImgBox,
  Price,
  PriceAndTime,
  ProductContainer,
  ProductImage,
  ProductInfo,
  ProductsWrapper,
} from "./commonStyle/ProductStyle";

const MainSection = styled.section`
  width: 1024px;
  margin: 0 auto;
  padding: 3.5rem 0px 1.5rem;
`;
const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;
const ProductSection = styled.div`
  position: relative;
  overflow: hidden;
`;
const TodayProduct = () => {
  const [products, setProducts] = useState<IProducts[]>();
  useEffect(() => {
    fetch(`/productapi/showlist`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <MainSection>
      <Title>오늘의 상품 추천</Title>
      <ProductSection>
        <ProductsWrapper>
          {products?.map((product) => (
            <ProductContainer key={product._id}>
              <Link to={`/product/${product._id}`}>
                <ImgBox>
                  <ProductImage
                    imageUrl={`${product.imageUrl.replaceAll("\\", "/")}`}
                    // 위도우 홤경에서 이렇게 해야 이미지 뜸
                  />
                </ImgBox>
                <ProductInfo>
                  <Description>{product.name}</Description>
                  <PriceAndTime>
                    <Price>
                      {product.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </Price>
                  </PriceAndTime>
                </ProductInfo>
              </Link>
            </ProductContainer>
          ))}
        </ProductsWrapper>
      </ProductSection>
    </MainSection>
  );
};

export default TodayProduct;
