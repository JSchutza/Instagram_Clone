import React from "react";
import { useDispatch } from "react-redux";
import { getFlwrPosts } from "../../store/post";

const DeleteCommentButton = ({ postId, commentId }) => {
  const dispatch = useDispatch();

  const clickHandler = async (event) => {
    event.preventDefault();
    const response = await fetch(`api/posts/${postId}/comments/${commentId}`, {
      method: "DELETE",
      credentials: "include",
    });
    dispatch(getFlwrPosts());
  };

  return (
    <>
      <a onClick={(event) => clickHandler(event)}> Delete </a>
    </>
  );
};

export default DeleteCommentButton;
