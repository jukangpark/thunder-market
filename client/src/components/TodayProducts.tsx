import { useEffect, useState } from "react";
import styled from "styled-components";
import { IProduct } from "../interface";
import ProductList from "./ProductList";

const ProductContainer = styled.div`
  padding: 3.5rem 0px 1.5rem;
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const TodayProducts = () => {
  const [products, setProducts] = useState<IProduct[]>();

  useEffect(() => {
    fetch(`/productapi/showlist`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <ProductContainer>
      <h2>오늘의 상품 추천</h2>
      <ProductList products={products} />
    </ProductContainer>
  );
};

export default TodayProducts;
