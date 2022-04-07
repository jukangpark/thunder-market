import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Comment = () => {
  const { id } = useParams();
  useEffect(() => {
    fetch(`/user/${id}/comments`)
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <div>
      <h1>Comment</h1>
      <form>
        <input placeholder="상점 문의" />
        <button>등록</button>
      </form>
    </div>
  );
};

export default Comment;
