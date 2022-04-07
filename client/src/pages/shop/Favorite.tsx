import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
      <h1>Favorites</h1>
      {favorites?.map((product, index) => (
        <div key={index}>{product.name}</div>
      ))}
    </div>
  );
};

export default Favorite;
