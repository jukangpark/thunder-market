import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopHeader, Title } from "../../components/commonStyle/LinkHeader";
import { IUser } from "../../interface";

const Following = () => {
  const [followings, setFollowings] = useState<IUser[]>();
  const { id } = useParams();
  useEffect(() => {
    fetch(`/user/${id}/followings`)
      .then((res) => res.json())
      .then((data) => setFollowings(data));
  }, []);

  console.log("팔로잉배열?", followings);
  return (
    <div>
      <ShopHeader>
        <Title>
          팔로잉
          <span>{followings?.length}</span>
        </Title>
      </ShopHeader>
      {followings?.map((user, index) => {
        return <div key={index}>{user.email}</div>;
      })}
    </div>
  );
};

export default Following;
