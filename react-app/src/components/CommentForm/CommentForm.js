import React, { useState } from "react";
import { thunk_addComment } from "../../store/comment";
import { useDispatch } from "react-redux";
import { getFlwrPosts, getUsrPosts } from "../../store/post";
import "./CommentForm.css";


const CommentForm = ({ setComment, postId, bool, id }) => {
  const [bodyText, setBodyText] = useState("");
  const dispatch = useDispatch();

  const submitComment = (event) => {
    event.preventDefault();
    const payload = {
      bodyText,
      postId,
    };
    dispatch(thunk_addComment(payload));
    bool ? dispatch(getFlwrPosts()) : dispatch(getUsrPosts(id))
    setBodyText('')
    if (setComment) {setComment(true)}
    };

  return (
    <>
      <form className="comment-form" onSubmit={submitComment}>
        <label>
          <button className='comment-form-button' type="submit">Post</button>
          <input
            className='comment-form-input'
            placeholder='Add a comment...'
            type="text"
            name="body"
            value={bodyText}
            onChange={(e) => setBodyText(e.target.value)}
          />
        </label>

      </form>
    </>
  );
};

export default CommentForm;
