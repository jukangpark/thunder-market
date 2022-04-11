import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopHeader, Title } from "../../components/commonStyle/LinkHeader";
import { IComment } from "../../interface";

const Review = () => {
  const [reviews, setReviews] = useState<IComment[]>([]);
  const { id } = useParams();
  useEffect(() => {
    fetch(`/user/${id}/reviews`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <div>
      <ShopHeader>
        <Title>
          상점후기
          <span>{reviews?.length}</span>
        </Title>
      </ShopHeader>
      <form method="POST" action={`/user/${id}/reviews`}>
        <input placeholder="상점 문의" name="text" id="text" required={true} />
        <button>등록</button>
      </form>

      {reviews?.map((review, index) => (
        <li key={index}>{review.text}</li>
      ))}
    </div>
  );
};

export default Review;
