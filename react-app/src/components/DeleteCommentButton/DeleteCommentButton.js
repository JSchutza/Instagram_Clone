import React from "react";
import { useDispatch } from "react-redux";
import { getFlwrPosts, getUsrPosts } from "../../store/post";

const DeleteCommentButton = ({ setComment, bool, id, postId, commentId }) => {
  const dispatch = useDispatch();

  const clickHandler = async (event) => {
    event.preventDefault();
    await fetch(`/api/posts/${postId}/comments/${commentId}`, {
      method: "DELETE",
      credentials: "include",
    });
    bool ? dispatch(getFlwrPosts()) : dispatch(getUsrPosts(id))
    setComment(true)
  };

  return (
    <>
      <a onClick={(event) => clickHandler(event)}> Delete </a>
    </>
  );
};

export default DeleteCommentButton;
