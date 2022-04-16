import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { Wrapper } from "../../components/commonStyle/fundamental";
import ProductList from "../../components/ProductList";
import { IProduct, IUser } from "../../interface";

const ContentBlock = styled.div`
  display: block;
  > div:first-child {
    font-size: 18px;
    padding: 50px 0px 20px;
    border-bottom: 1px solid rgb(238, 238, 238);
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    font-weight: 600;
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
    color: ${(props) => props.theme.textColor};
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

const Product = () => {
  const { id } = useParams();
  const [products, setProducts] = useState<IProduct[]>();
  const [empty, setEmpty] = useState(true);
  const [user, setUser] = useState<IUser>();
  const [recent, setRecent] = useState(true);
  const [popular, setPopular] = useState(false);
  const [low, setLow] = useState(false);
  const [high, setHigh] = useState(false);

  useEffect(() => {
    fetch(`/user/${id}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.sort(current("createdAt")));
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
    setLow(true);
    setRecent(false);
    setPopular(false);
    setHigh(false);
  };

  const highCompare = (price: string) => {
    return (a: any, b: any) =>
      a[price] < b[price] ? 1 : a[price] > b[price] ? -1 : 0;
  };
  const highPrice = () => {
    products?.sort(highCompare("price"));
    setLow(false);
    setRecent(false);
    setPopular(false);
    setHigh(true);
  };

  const popularityCompare = (views: string) => {
    return (a: any, b: any) =>
      a[views] < b[views] ? 1 : a[views] > b[views] ? -1 : 0;
  };
  const popularity = () => {
    products?.sort(popularityCompare("views"));
    setLow(false);
    setRecent(false);
    setPopular(true);
    setHigh(false);
  };

  const current = (createdAt: string) => {
    return (a: any, b: any) =>
      a[createdAt] < b[createdAt] ? 1 : a[createdAt] > b[createdAt] ? -1 : 0;
  };
  const clickCurrent = () => {
    products?.sort(current("createdAt"));
    setLow(false);
    setRecent(true);
    setPopular(false);
    setHigh(false);
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
                <Link
                  to={`/shop/${user?._id}/products`}
                  onClick={clickCurrent}
                  style={
                    recent
                      ? { color: "rgb(247, 51, 47)", fontWeight: "600" }
                      : { color: "rgb(136, 136, 136)" }
                  }
                >
                  최신순
                </Link>
                <Link
                  to={`/shop/${user?._id}/products`}
                  onClick={popularity}
                  style={
                    popular
                      ? { color: "rgb(247, 51, 47)", fontWeight: "600" }
                      : { color: "rgb(136, 136, 136)" }
                  }
                >
                  인기순
                </Link>
                <Link
                  to={`/shop/${user?._id}/products`}
                  onClick={lowPrice}
                  style={
                    low
                      ? { color: "rgb(247, 51, 47)", fontWeight: "600" }
                      : { color: "rgb(136, 136, 136)" }
                  }
                >
                  저가순
                </Link>
                <Link
                  to={`/shop/${user?._id}/products`}
                  onClick={highPrice}
                  style={
                    high
                      ? { color: "rgb(247, 51, 47)", fontWeight: "600" }
                      : { color: "rgb(136, 136, 136)" }
                  }
                >
                  고가순
                </Link>
              </Sort>
            </ProductAmount>
          </GrossBox>
          <ProductList products={products} />
        </ProductContent>
      ) : (
        <NoneProduct>등록된 상품이 없습니다.</NoneProduct>
      )}
    </Wrapper>
  );
};

export default Product;
