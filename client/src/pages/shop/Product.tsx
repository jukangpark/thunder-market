import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { Wrapper } from "../../components/commonStyle/fundamental";
import {
  Description,
  ImgBox,
  Price,
  PriceAndTime,
  ProductContainer,
  ProductImage,
  ProductInfo,
  ProductsWrapper,
} from "../../components/commonStyle/ProductStyle";
import { IProducts, IUser } from "../../interface";

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
`;
const OptionImg = styled.img`
  width: 10px;
  height: 6px;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
`;
const ProductContent = styled.div`
  margin-top: 30px;
`;
const NoneProduct = styled.div`
  color: ${(props) => props.theme.btnColor};
  margin: 30px 0px 100px;
`;
const GrossBox = styled.div`
  margin-bottom: 25px;
`;
const ProductAmount = styled.div`
  display: flex;
  width: 100%;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  > div {
    display: flex;
  }
`;
const Gross = styled.div`
  font-size: 16px;
  > div:last-child {
    color: ${(props) => props.theme.btnColor};
    margin-left: 20px;
  }
`;
const Sort = styled.div`
  font-size: 13px;
  a {
    margin-right: 20px;
    position: relative;
    display: block;
    cursor: pointer;
    ::after {
      content: "";
      position: absolute;
      top: 1px;
      right: -10px;
      width: 1px;
      height: 12px;
      border-right: 1px solid rgb(204, 204, 204);
    }
  }
  a:last-child {
    margin-right: 0;
    ::after {
      border-right: 0;
    }
  }
`;
const LocationInfo = styled.div`
  height: 40px;
  border-top: 1px solid rgb(238, 238, 238);
  font-size: 12px;
  display: block;
  padding: 14px 10px 14px 35px;
  color: ${(props) => props.theme.btnColor};
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
  box-sizing: border-box;
`;
const LocationImg = styled.img`
  position: absolute;
  left: 10px;
  top: calc(50% - 8px);
  width: 15px;
  height: 17px;
`;
const Product = () => {
  const [products, setProducts] = useState<IProducts[]>();
  const [empty, setEmpty] = useState(true);
  const { id } = useParams();
  const [cookies] = useCookies(["user"]);
  const [user, setUser] = useState<IUser>();
  useEffect(() => {
    if (cookies.user) {
      fetch("/user/info")
        .then((res) => res.json())
        .then((data) => setUser(data));
    }
  }, []);
  useEffect(() => {
    fetch(`/user/${id}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        if (data.length === 0) {
          setEmpty(false);
        }
      });
  }, []);

  const lowCompare = (price: string) => {
    return (a: any, b: any) =>
      a[price] > b[price] ? 1 : a[price] < b[price] ? -1 : 0;
  };
  const lowPrice = () => {
    products?.sort(lowCompare("price"));
  };
  const highCompare = (price: string) => {
    return (a: any, b: any) =>
      a[price] < b[price] ? 1 : a[price] > b[price] ? -1 : 0;
  };
  const highPrice = () => {
    products?.sort(highCompare("price"));
  };
  const popularityCompare = (views: string) => {
    return (a: any, b: any) =>
      a[views] < b[views] ? 1 : a[views] > b[views] ? -1 : 0;
  };
  const popularity = () => {
    products?.sort(popularityCompare("views"));
  };
  return (
    <Wrapper>
      <ContentBlock>
        <div>
          <div>
            상품
            <span>{products?.length}</span>
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
      </ContentBlock>
      {empty ? (
        <ProductContent>
          <GrossBox>
            <ProductAmount>
              <Gross>
                <div>전체</div>
                <div>{products?.length}</div>
              </Gross>
              <Sort>
                <Link to={`/shop/${user?._id}/products`}>최신순</Link>
                <Link to={`/shop/${user?._id}/products`} onClick={popularity}>
                  인기순
                </Link>
                <Link to={`/shop/${user?._id}/products`} onClick={lowPrice}>
                  저가순
                </Link>
                <Link to={`/shop/${user?._id}/products`} onClick={highPrice}>
                  고가순
                </Link>
              </Sort>
            </ProductAmount>
          </GrossBox>
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
                  <LocationInfo>
                    <LocationImg src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAiCAYAAABIiGl0AAAAAXNSR0IArs4c6QAAA6xJREFUWAm1l01IVFEUx51xNAtxIcEENuQIrqTxO8OEmj5IAncVUS2E2kS0axO4C5KiFi0lXIh9QBC1kKgwclNGjaNOSUEapVRiUSHoTOo4/c743vjem/vGp8xcuHPu+Z//Of9778y9740rz0EbGxsrjsViQait9JpEIuF1uVzbGCfo0/jT2GGwx6WlpQN+vz+Gn7G5MkXD4fAOil6C047dlImrxxCfg9tVUFBwtbq6ekbHrVYpzAoLo9FoJ+QL9AJrkkN/3u12d9bW1l5hMsvWnDTh4eHh8uXl5fvMutFK3qD/jLxTDQ0Nv4z5JuHR0VH/4uLiKwjy/WWtseJPLKTZKO7Wq4dCoa1LS0tP8bMqKvURrcT0TU1NbRZfWkqYWXVrhJVI9j+bZmZmbuplk1s9NDR0GNEnOpgrKz8ydBrZ8rBHRHCur0MsCvc1Pazl1GF301PbqOFpBh3Z4Rv0oIvVBgBG01hqYKCwsPBMIBD4bAxHIpGKhYWFbrB9RtxuzDEr9yB6zI5gwV/U19cfYLvktjI1mQh19rOI5wSCpqDC4bgelaXvUcRMEGJzAO0qUZ2oxdrx53XMzsI9KMJldgQDPsgPYtLgK4fCoeigMmgA2R2fCG83YMohxCFlQAHCDSlgE8Tkytx8yDZmbHCKMxIMQSdcJueWFU8Y8pRDiA3KgAJ0yJ1wJMwqGrlSWxQ6Jkg4wjWBamfCzQzfqmOrqGwNXo/c56uoeaTFejSuOWjxmNx7KXiHwYIlpnIr4I1xVo9TPF8nyFgwiYFV6LidhZfgJaFXv6vvUeCEHVmBy7UZ0fAAds3rUq+BcD8X0SFZcR5XWJcecGhFqEnrjkW12rfEJoV5PRlgJg+1QM4MGqG6uroHKWEZsNXnCfzNmWpe3iL1z9LjJmGuux+AF3MlTO1rrDb1FExutS5GQB5tj3Q/WxbRSElJyWVjPZOwBLxe70mI8sKXrTaZn59/pLKy8p+xYJqwz+eLFhUVtUH6aCRuZMwC/tBba2pqvlnz04SFUFVV9Zsj1krSd2vCOvwYNdo4sx9UOUphIfJ9f8XsRXxclbgGNiuiHNOXdjxbYUlgtuMINzN8Y1dAgU+BtTDxfkUsBWUUFhYFfmKCTKAvlWU/kDfPJo7mO3vKSiR5V69Fkrg8DPj32IHtwE2+FhvzmFivx+M5xz/ENV8sJM+xsC4yMjKyKx6P32YC8rdE2iz9HKu8m/QcfqxbWOry7N2CkRfznZzR0/yIvjBeV/sPFdozA8TD8zUAAAAASUVORK5CYII=" />
                    {product.location}
                  </LocationInfo>
                </Link>
              </ProductContainer>
            ))}
          </ProductsWrapper>
        </ProductContent>
      ) : (
        <NoneProduct>등록된 상품이 없습니다.</NoneProduct>
      )}
    </Wrapper>
  );
};

export default Product;
