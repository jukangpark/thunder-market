import styled from "styled-components";
import { IProps } from "../../interface";

export const ProductsWrapper = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(5, minmax(0, 1fr));

  /* display: flex;
  flex-wrap: wrap; */
`;
export const ProductContainer = styled.div`
  /* width: 196px;
  margin-right: 11px;
  margin-bottom: 11px; */

  a {
    text-decoration: none;
    display: block;
    border: 1px solid rgb(238, 238, 238);
  }
`;
export const ImgBox = styled.div`
  /* position: relative; */
  height: 195px;
`;
export const ProductImage = styled.div<IProps>`
  height: 100%;
  background-image: url(${(props) => props.imageUrl});
  background-position: center;
  background-size: cover;
`;
export const ProductInfo = styled.div`
  padding: 15px 10px;
  height: 80px;
`;
export const Description = styled.div`
  position: relative;
  font-size: 14px;
  padding-bottom: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
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
