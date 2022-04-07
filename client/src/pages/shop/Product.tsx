import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { Wrapper } from "../../components/StyleTS/fundamental";
import {
  Description,
  ImgBox,
  Price,
  PriceAndTime,
  ProductContainer,
  ProductImage,
  ProductInfo,
  ProductsWrapper,
} from "../../components/StyleTS/ProductStyle";
import { IProducts } from "../../interface";

const ContentBlock = styled.div`
  display: block;
  > div:first-child {
    font-size: 18px;
    padding: 50px 0px 20px;
    border-bottom: 1px solid rgb(238, 238, 238);
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    > div > span {
      color: ${(props) => props.theme.accentColor};
    }
    > div:last-child {
      width: 140px;
    }
    > div:last-child > div {
      border: 1px solid rgb(238, 238, 238);
      display: flex;
      width: 100%;
      height: 28px;
      -webkit-box-align: center;
      align-items: center;
      position: relative;
      font-size: 12px;
      color: rgb(77, 77, 77);
      > div {
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        padding: 0 25px 0px 10px;
        position: relative;
        width: 100%;
      }
    }
  }
  > div:last-child {
    color: ${(props) => props.theme.btnColor};
    margin: 30px 0px 100px;
  }
`;
const OptionImg = styled.img`
  width: 10px;
  height: 6px;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
`;

const Product = () => {
  const [products, setProducts] = useState<IProducts[]>();
  const { id } = useParams();

  useEffect(() => {
    fetch(`/user/${id}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <Wrapper>
      <ContentBlock>
        <div>
          <div>
            상품
            <span>0</span>
          </div>
          <div>
            <div>
              <div>
                전체
                <OptionImg src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAOCAYAAAAvxDzwAAAAAXNSR0IArs4c6QAAASVJREFUOBGlks9qwkAQxrMLihRKQXyUHjx58dBLEXqxUPCavIKvkpCQgxcTD0LpSQQfoBfpRXwHj16av37fYWWrJhvqwDCbb2d+O5NdYcFc120hzIQQkW3bS2pNzPf9blEUC+ROUffNGkEYQWVZvuE7xfq9CRR1T8hfw5/hR/jIcZyN8DyPsDEEZUZoEASPeZ6vUNdXRYi/aOZVYjGHp9pGC4kRDmLHV4bOHrIs+7qAWYDtoW0lx+OYqDRCwzDsIO8TPtBPQv0PYEOMfGCHVhNoHMftJEl4YcMqGHWhb3JMjguNt64slVJOoH/AR0pk1DtT+h8gxQqoyj/HWzBuXgEpmqBVsEpgHbQOVgu8BTXBjEAdCthOPQ3qdxn+6QsedO8uyH+LT8nvvwPGjeHzAAAAAElFTkSuQmCC" />
              </div>
            </div>
          </div>
        </div>
        <div>등록된 상품이 없습니다.</div>
      </ContentBlock>
      <ProductsWrapper>
        {products?.map((product) => (
          <ProductContainer key={product._id}>
            <Link to={`/product/${product._id}`}>
              <ImgBox>
                <ProductImage
                  imageUrl={`${product.imageUrl.replaceAll("\\", "/")}`}
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
    </Wrapper>
  );
};

export default Product;
