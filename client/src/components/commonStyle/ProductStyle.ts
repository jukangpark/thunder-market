import styled from "styled-components";
import { IProps } from "../../interface";

export const ProductsWrapper = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
`;

export const ProductContainer = styled.div`
  a {
    text-decoration: none;
    display: block;
    border: 1px solid rgb(238, 238, 238);
  }
`;

export const ImgBox = styled.div`
  height: 194px;
`;

export const ProductImage = styled.div<IProps>`
  height: 100%;
  background-image: url(${(props) => props.imageUrl});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const ProductInfo = styled.div`
  padding: 15px 10px;
`;

export const Description = styled.div`
  font-size: 14px;
  padding-bottom: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const PriceAndTime = styled.div`
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  height: 20px;
`;

export const Price = styled.div`
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

export const LocationInfo = styled.div`
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

export const LocationImg = styled.img`
  position: absolute;
  left: 10px;
  top: calc(50% - 8px);
  width: 15px;
  height: 17px;
`;
