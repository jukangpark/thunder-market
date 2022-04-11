import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopHeader, Title } from "../../components/commonStyle/LinkHeader";
import ProductList from "../../components/ProductList";
import { IProduct } from "../../interface";

const Favorite = () => {
  const { id } = useParams();
  const [favorites, setFavorites] = useState<IProduct[]>();

  useEffect(() => {
    fetch(`/user/${id}/favorites`)
      .then((res) => res.json())
      .then((data) => setFavorites(data));
  }, []);

  return (
    <div>
      <ShopHeader>
        <Title>
          찜<span>{favorites?.length}</span>
        </Title>
      </ShopHeader>
      <ProductList products={favorites} />
    </div>
  );
};

export default Favorite;
