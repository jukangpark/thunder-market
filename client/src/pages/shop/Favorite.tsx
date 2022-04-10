import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopHeader, Title } from "../../components/commonStyle/LinkHeader";
import { IProducts } from "../../interface";

const Favorite = () => {
  const { id } = useParams();
  const [favorites, setFavorites] = useState<IProducts[]>();

  useEffect(() => {
    fetch(`/user/${id}/favorites`)
      .then((res) => res.json())
      .then((data) => setFavorites(data));
  }, []);
  console.log(favorites);
  return (
    <div>
      <ShopHeader>
        <Title>
          찜<span>{favorites?.length}</span>
        </Title>
      </ShopHeader>
      {favorites?.map((product, index) => (
        <div key={index}>
          <div>{product.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Favorite;
