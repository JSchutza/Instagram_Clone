import React, { useState } from "react";
import { thunk_addComment } from "../../store/comment";
import { useDispatch } from "react-redux";
import { getFlwrPosts, getUsrPosts } from "../../store/post";

const CommentForm = ({ postId, bool, id }) => {
  const [bodyText, setBodyText] = useState("");
  const dispatch = useDispatch();

  const submitComment = (event) => {
    event.preventDefault();
    const payload = {
      bodyText,
      postId,
    };
    dispatch(thunk_addComment(payload));
    console.log(bool)
    bool ? dispatch(getFlwrPosts()) : dispatch(getUsrPosts(id))
    setBodyText('')
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
