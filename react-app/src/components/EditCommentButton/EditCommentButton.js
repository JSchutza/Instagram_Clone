import React from "react";
import { useDispatch } from "react-redux";
import { getFlwrPosts, getUsrPosts } from "../../store/post";

const EditCommentButton = ({ resetEdit, editVal, commentId, bool }) => {
  const dispatch = useDispatch();

  const clickHandler = async (event) => {
    event.preventDefault();
    await fetch(`/api/posts/comments/${commentId}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editVal),
    });
    resetEdit();
    if (!bool) {
      dispatch(getFlwrPosts());
    } else {
      dispatch(getUsrPosts(bool));
    }
  };

  return (
    <>
      <a onClick={(event) => clickHandler(event)}>Save</a>
    </>
  );
};

export default EditCommentButton;
