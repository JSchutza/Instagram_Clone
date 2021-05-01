import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getFlwrPosts } from "../../store/post";

const LikeButton = ({ post, user }) => {
  const [like, setLike] = useState("Like");
  const [lid, setLid] = useState("");
  const dispatch = useDispatch();
  const userId = user.id;

  useEffect(() => {
    post.likes.forEach((like) => {
      if (like.userId === userId) {
        setLike("Unlike");
        setLid(like.id);
      }
    });
  }, [post.likes, userId]);

  async function likeButton() {
    if (like === "Unlike") {
      await fetch(`/api/posts/${post.id}/likes/${lid}`, { method: "DELETE" });
      setLike("Like");
    } else {
      const response = await fetch(`/api/posts/${post.id}/likes`, {
        method: "POST",
      });
      const result = await response.json();
      setLid(result.id);
      setLike("Unlike");
    }
    dispatch(getFlwrPosts());
  }

  return <button onClick={likeButton}>{like}</button>;
};

export default LikeButton;
