import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Review = () => {
  const { id } = useParams();
  useEffect(() => {
    fetch(`/user/${id}/reviews`)
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return <div>Review</div>;
};

export default Review;
