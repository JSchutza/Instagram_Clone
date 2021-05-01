import React, { useState } from "react";
import { thunk_addComment } from "../../store/comment";
import { useDispatch } from "react-redux";
import { getFlwrPosts } from "../../store/post";

const CommentForm = ({ postId }) => {
  const [bodyText, setBodyText] = useState("");
  const dispatch = useDispatch();

  const submitComment = (event) => {
    event.preventDefault();
    const payload = {
      bodyText,
      postId,
    };
    dispatch(thunk_addComment(payload));
    dispatch(getFlwrPosts());
  };

  return (
    <>
      <form className="" onSubmit={submitComment}>
        <label>
          Comment
          <input
            type="text"
            name="body"
            value={bodyText}
            onChange={(e) => setBodyText(e.target.value)}
          />
        </label>

        <button type="submit"> Create Comment </button>
      </form>
    </>
  );
};

export default CommentForm;
