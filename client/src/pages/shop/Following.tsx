import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Following = () => {
  const { id } = useParams();
  useEffect(() => {
    fetch(`/user/${id}/followings`)
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return <div>Following</div>;
};

export default Following;
