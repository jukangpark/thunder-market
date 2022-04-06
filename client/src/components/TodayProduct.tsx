import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IProducts, IProps } from "../typeScript";

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
const ProductsWrapper = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(5, minmax(0, 1fr));

  /* display: flex;
  flex-wrap: wrap; */
`;
const ProductContainer = styled.div`
  /* width: 196px;
  margin-right: 11px;
  margin-bottom: 11px; */

  a {
    text-decoration: none;
    display: block;
    border: 1px solid rgb(238, 238, 238);
  }
`;
const ImgBox = styled.div`
  /* position: relative; */
  height: 195px;
`;
const ProductImage = styled.div<IProps>`
  height: 100%;
  background-image: url(${(props) => props.imageUrl});
  background-position: center;
  background-size: cover;
`;
const ProductInfo = styled.div`
  padding: 15px 10px;
  height: 80px;
`;
const Description = styled.div`
  position: relative;
  font-size: 14px;
  padding-bottom: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
const PriceAndTime = styled.div`
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  height: 20px;
`;
const Price = styled.div`
  font-size: 16px;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  ::after {
    content: "원";
    font-size: 13px;
    margin-left: 3px;
  }
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
                  <ProductImage imageUrl={`${product.imageUrl}`} />
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
