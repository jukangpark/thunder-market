import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShopHeader, Title } from "../../components/commonStyle/LinkHeader";

const Following = () => {
  const { id } = useParams();
  useEffect(() => {
    fetch(`/user/${id}/followings`)
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <ShopHeader>
      <Title>
        팔로잉
        <span>0</span>
      </Title>
    </ShopHeader>
  );
};

export default Following;
