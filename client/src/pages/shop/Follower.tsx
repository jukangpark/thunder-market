import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopHeader, Title } from "../../components/commonStyle/LinkHeader";
import { IUser } from "../../interface";

const Follower = () => {
  const [follower, setFollower] = useState<IUser[]>();
  const { id } = useParams();
  useEffect(() => {
    fetch(`/user/${id}/followers`)
      .then((res) => res.json())
      .then((data) => setFollower(data));
  }, []);
  console.log(follower);
  return (
    <div>
      <ShopHeader>
        <Title>
          팔로워
          <span>{follower?.length}</span>
        </Title>
      </ShopHeader>
      {follower?.map((user, index) => {
        return (
          <div key={index}>
            <h1>{user?.email}</h1>
            <h1>상품: {user?.products.length}</h1>
            <h1>팔로워: {user?.followers.length}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default Follower;
