import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopHeader, Title } from "../../components/StyleTS/LinkHeader";

const Follower = () => {
  const [follower, setFollower] = useState();
  const { id } = useParams();
  useEffect(() => {
    fetch(`/user/${id}/followers`)
      .then((res) => res.json())
      .then((data) => setFollower(data));
  }, []);
  console.log(follower)
  return (
    <>
    <ShopHeader>
      <Title>
        팔로워
        <span></span>
      </Title>
    </ShopHeader>
    </>
  );
};

export default Follower;
