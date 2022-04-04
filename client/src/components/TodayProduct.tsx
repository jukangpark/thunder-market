import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface IProducts {
  categories: string;
  change: string;
  delivery: string;
  description: string;
  hashtags: string;
  imageUrl: string;
  location: string;
  meta: {
    views: number;
  };
  name: string;
  newProduct: string;
  price: number;
  __v: number;
  _id: string;
}
const MainSection = styled.section`
  width: 1024px;
  margin: 0 auto;
  padding: 3.5rem 0px 1.5rem;
`;
const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: rgb(33, 33, 33);
`;
const ProductSection = styled.div`
  position: relative;
  overflow: hidden;
`;
const ProductsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const ProductContainer = styled.div`
  width: 196px;
  margin-right: 11px;
  margin-bottom: 11px;
  a {
    text-decoration: none;
    color: rgb(33, 33, 33);
    display: block;
    background: rgb(255, 255, 255);
    border: 1px solid rgb(238, 238, 238);
  }
`;
const ImgBox = styled.div`
  position: relative;
  width: 100%;
  height: 194px;
`;
const ProductImage = styled.img`
  width: 194px;
  height: 194px;
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
  const [products, setProducts] = useState<IProducts[]>([]);
  useEffect(() => {
    fetch(`/product/showlist`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <MainSection>
      <Title>오늘의 상품 추천</Title>
      <ProductSection>
        <ProductsWrapper>
          {products.map((product) => (
            <ProductContainer key={product._id}>
              <Link to={`/product/${product._id}`}>
                <ImgBox>
                  <ProductImage src={`/${product.imageUrl}`} />
                </ImgBox>
                <ProductInfo>
                  <Description>{product.description}</Description>
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
