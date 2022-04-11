import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { ShopHeader, Title } from "../../components/commonStyle/LinkHeader";
import { IComment } from "../../interface";

const Comment = () => {
  const [comments, setComments] = useState<IComment[]>();
  const { id } = useParams();

  useEffect(() => {
    fetch(`/user/${id}/comments`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, []);

  console.log(comments);

  return (
    <div>
      <ShopHeader>
        <Title>
          Comment<span>{comments?.length}</span>
        </Title>
      </ShopHeader>
      <span>{comments?.length}</span>
      <form method="POST" action={`/user/${id}/comments`}>
        <input placeholder="상점 문의" name="text" id="text" required={true} />
        <button>등록</button>
      </form>
      {comments?.map((comment, index) => (
        <li key={index}>{comment.text}</li>
      ))}
    </div>
  );
};

export default Comment;
