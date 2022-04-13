import { useEffect, useState } from "react";
import Moment from "react-moment";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { ShopHeader, Title } from "../../components/commonStyle/LinkHeader";
import { ProductImage } from "../../components/commonStyle/ProductStyle";
import { IProduct } from "../../interface";

interface BtnColor {
  AllChecked: boolean;
}
interface BtnColor2 {
  checked: boolean;
}
const Wrapper = styled.div`
  margin-bottom: 30px;
`;
const BtnSector = styled.div`
  margin: 25px 0px 20px;
  width: 100%;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
`;
const Btn = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
`;
const CheckBtn = styled.div<BtnColor>`
  width: 24px;
  height: 24px;
  border: 1px solid
    ${(props) =>
      props.AllChecked ? "rgb(255, 255, 255)" : "rgb(204, 204, 204)"};
  position: relative;
  transition: 0.2s;
  background-color: ${(props) =>
    props.AllChecked ? "rgb(247, 47, 51)" : "rgb(255, 255, 255)"};
  /* ::after {
      content: "";
      position: absolute;
      bottom: 5px;
      left: 2px;
      border: 2px solid rgb(204, 204, 204);
      border-left: 0;
      border-top: 0;
      width: 0;
      height: 0;
      background: none;
      transform: rotate(40deg);
      transform-origin: 100% 100%;
      transition: width 0.1s ease-out 0s, height 0.1s ease-out 0.1s;
    } */
  ::before {
    content: "";
    position: absolute;
    bottom: 5px;
    left: 2px;
    border: 2px solid
      ${(props) =>
        props.AllChecked ? "rgb(255, 255, 255)" : "rgb(204, 204, 204)"};
    border-left: 0;
    border-top: 0;
    width: 8px;
    height: 14px;
    transform: rotate(40deg);
    transform-origin: 100% 100%;
    box-sizing: border-box;
  }
`;
const CheckBtn2 = styled.div<BtnColor2>`
  width: 24px;
  height: 24px;
  border: 1px solid
    ${(props) => (props.checked ? "rgb(255, 255, 255)" : "rgb(204, 204, 204)")};
  position: relative;
  transition: 0.2s;
  background-color: ${(props) =>
    props.checked ? "rgb(247, 47, 51)" : "rgb(255, 255, 255)"};
  ::before {
    content: "";
    position: absolute;
    bottom: 5px;
    left: 2px;
    border: 2px solid
      ${(props) =>
        props.checked ? "rgb(255, 255, 255)" : "rgb(204, 204, 204)"};
    border-left: 0;
    border-top: 0;
    width: 8px;
    height: 14px;
    transform: rotate(40deg);
    transform-origin: 100% 100%;
    box-sizing: border-box;
  }
`;
const DeleteBtn = styled.button`
  margin-left: 10px;
  padding: 0px 10px;
  height: 28px;
  border: 1px solid rgb(238, 238, 238);
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  justify-content: center;
  font-size: 13px;
  color: ${(props) => props.theme.btnColor};
`;
const ProductSector = styled.div`
  display: flex;
  flex-wrap: wrap;
  -webkit-box-pack: justify;
  justify-content: space-between;
`;
const ProductContainer = styled.div`
  width: 502px;
  margin-bottom: 20px;
  > a {
    width: 100%;
    height: 140px;
    display: flex;
    border: 1px solid rgb(238, 238, 238);
    position: relative;
  }
`;
const CheckBtnBox = styled.div`
  position: absolute;
  top: 20px;
  right: 12px;
`;
const ProductImgBox = styled.div`
  position: relative;
  width: 139px;
  flex-shrink: 0;
  height: 100%;
`;
const InfoContainer = styled.div`
  width: 363px;
  flex-shrink: 0;
`;
const TitleAndPrice = styled.div`
  padding: 0px 64px 0px 20px;
  width: 100%;
`;
const ProductTitle = styled.div`
  margin: 18px 0px 10px;
  width: 100%;
  height: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  line-height: 14px;
`;
const Price = styled.div`
  font-size: 16px;
  font-weight: bold;
  display: flex;
  > div {
    position: relative;
    ::after {
      content: "원";
      position: absolute;
      font-weight: normal;
      font-size: 13px;
      top: 1px;
      right: -15px;
    }
  }
`;
const Timezone = styled.div`
  height: 40px;
  display: flex;
  width: 100%;
  -webkit-box-align: center;
  align-items: center;
  color: ${(props) => props.theme.btnColor};
`;
const LocationBox = styled.div`
  height: 40px;
  display: flex;
  width: 100%;
  -webkit-box-align: center;
  align-items: center;
  padding-left: 20px;
  border-top: 1px solid rgb(238, 238, 238);
  font-size: 12px;
  color: ${(props) => props.theme.btnColor};
  box-sizing: border-box;
`;
const LocationImg = styled.img`
  margin-right: 5px;
  width: 15px;
  height: 17px;
`;
const Favorite = () => {
  const { id } = useParams();
  const [favorites, setFavorites] = useState<IProduct[]>();
  const [AllChecked, setAllChecked] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    fetch(`/user/${id}/favorites`)
      .then((res) => res.json())
      .then((data) => setFavorites(data));
  }, []);

  const onClickedAll = () => {
    setAllChecked(!AllChecked);
    setChecked(!AllChecked);
  };
  const onClick = (event: any) => {
    event.preventDefault();
    const { productid } = event.currentTarget.dataset;

    setChecked(!checked);
  };
  console.log(AllChecked);
  return (
    <div>
      <ShopHeader>
        <Title>
          찜<span>{favorites?.length}</span>
        </Title>
      </ShopHeader>
      <Wrapper>
        <BtnSector>
          <Btn>
            <CheckBtn AllChecked={AllChecked} onClick={onClickedAll}></CheckBtn>
            <DeleteBtn>선택삭제</DeleteBtn>
          </Btn>
        </BtnSector>
        <ProductSector>
          {favorites?.map((favorite) => (
            <ProductContainer key={favorite._id}>
              <Link to={`/product/${favorite._id}`}>
                <CheckBtnBox>
                  <CheckBtn2
                    checked={checked}
                    onClick={onClick}
                    data-productid={favorite._id} // 좀더 생각해보기.
                  />
                </CheckBtnBox>
                <ProductImgBox>
                  <ProductImage
                    imageUrl={`${favorite.imageUrl.replaceAll("\\", "/")}`}
                  />
                </ProductImgBox>
                <InfoContainer>
                  <TitleAndPrice>
                    <ProductTitle>{favorite.name}</ProductTitle>
                    <Price>
                      <div>
                        {favorite.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </div>
                    </Price>
                    <Timezone>
                      <Moment fromNow style={{ fontSize: "12px" }}>
                        {favorite.createdAt}
                      </Moment>
                    </Timezone>
                  </TitleAndPrice>
                  <LocationBox>
                    <LocationImg src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAiCAYAAABIiGl0AAAAAXNSR0IArs4c6QAAA6xJREFUWAm1l01IVFEUx51xNAtxIcEENuQIrqTxO8OEmj5IAncVUS2E2kS0axO4C5KiFi0lXIh9QBC1kKgwclNGjaNOSUEapVRiUSHoTOo4/c743vjem/vGp8xcuHPu+Z//Of9778y9740rz0EbGxsrjsViQait9JpEIuF1uVzbGCfo0/jT2GGwx6WlpQN+vz+Gn7G5MkXD4fAOil6C047dlImrxxCfg9tVUFBwtbq6ekbHrVYpzAoLo9FoJ+QL9AJrkkN/3u12d9bW1l5hMsvWnDTh4eHh8uXl5fvMutFK3qD/jLxTDQ0Nv4z5JuHR0VH/4uLiKwjy/WWtseJPLKTZKO7Wq4dCoa1LS0tP8bMqKvURrcT0TU1NbRZfWkqYWXVrhJVI9j+bZmZmbuplk1s9NDR0GNEnOpgrKz8ydBrZ8rBHRHCur0MsCvc1Pazl1GF301PbqOFpBh3Z4Rv0oIvVBgBG01hqYKCwsPBMIBD4bAxHIpGKhYWFbrB9RtxuzDEr9yB6zI5gwV/U19cfYLvktjI1mQh19rOI5wSCpqDC4bgelaXvUcRMEGJzAO0qUZ2oxdrx53XMzsI9KMJldgQDPsgPYtLgK4fCoeigMmgA2R2fCG83YMohxCFlQAHCDSlgE8Tkytx8yDZmbHCKMxIMQSdcJueWFU8Y8pRDiA3KgAJ0yJ1wJMwqGrlSWxQ6Jkg4wjWBamfCzQzfqmOrqGwNXo/c56uoeaTFejSuOWjxmNx7KXiHwYIlpnIr4I1xVo9TPF8nyFgwiYFV6LidhZfgJaFXv6vvUeCEHVmBy7UZ0fAAds3rUq+BcD8X0SFZcR5XWJcecGhFqEnrjkW12rfEJoV5PRlgJg+1QM4MGqG6uroHKWEZsNXnCfzNmWpe3iL1z9LjJmGuux+AF3MlTO1rrDb1FExutS5GQB5tj3Q/WxbRSElJyWVjPZOwBLxe70mI8sKXrTaZn59/pLKy8p+xYJqwz+eLFhUVtUH6aCRuZMwC/tBba2pqvlnz04SFUFVV9Zsj1krSd2vCOvwYNdo4sx9UOUphIfJ9f8XsRXxclbgGNiuiHNOXdjxbYUlgtuMINzN8Y1dAgU+BtTDxfkUsBWUUFhYFfmKCTKAvlWU/kDfPJo7mO3vKSiR5V69Fkrg8DPj32IHtwE2+FhvzmFivx+M5xz/ENV8sJM+xsC4yMjKyKx6P32YC8rdE2iz9HKu8m/QcfqxbWOry7N2CkRfznZzR0/yIvjBeV/sPFdozA8TD8zUAAAAASUVORK5CYII=" />
                    {favorite.location}
                  </LocationBox>
                </InfoContainer>
              </Link>
            </ProductContainer>
          ))}
        </ProductSector>
      </Wrapper>
    </div>
  );
};

export default Favorite;
