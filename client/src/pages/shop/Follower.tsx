import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Follower = () => {
  const { id } = useParams();
  useEffect(() => {
    fetch(`/user/${id}/followers`)
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return <div>Follower</div>;
};

export default Follower;
