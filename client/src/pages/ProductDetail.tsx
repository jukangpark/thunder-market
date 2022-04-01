import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();

  console.log(id);
  useEffect(() => {
    fetch(`/product/${id}`)
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return <div>product detail</div>;
};

export default ProductDetail;
