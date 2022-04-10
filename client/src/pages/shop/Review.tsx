import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShopHeader, Title } from "../../components/commonStyle/LinkHeader";

const Review = () => {
  const { id } = useParams();
  useEffect(() => {
    fetch(`/user/${id}/reviews`)
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <ShopHeader>
      <Title>
        상점후기
        <span>0</span>
      </Title>
    </ShopHeader>
  );
};

export default Review;
