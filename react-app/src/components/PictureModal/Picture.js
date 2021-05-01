import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import "./Picture.css";
import { deletePost, getUsrPosts } from "../../store/post";
import EditCommentButton from "../EditCommentButton";
import EditFormModal from "../EditModal";
import CommentForm from "../CommentForm";
import DeleteCommentButton from "../DeleteCommentButton";

const Picture = ({ id, setShowModal, post }) => {
  const [like, setLike] = useState("Like");
  const [lid, setLid] = useState("");
  const [editComment, setEditComment] = useState(-1);
  const [editVal, setEditVal] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const userId = user.id;

  const resetEdit = () => setEditComment(-1);

  const del = (post) => {
    dispatch(deletePost(post));
    setShowModal(-1);
  };

  useEffect(() => {
    post.likes.forEach((like) => {
      if (like.userId === userId) {
        setLike("Unlike");
        setLid(like.id);
      }
    });
  }, [post, userId]);

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
    dispatch(getUsrPosts(post.userId));
  }

  return (
    <div className="picture-modal">
      <img alt="post" className="picture-modal-image" src={post.url}></img>
      <div className="picture-modal-like">
        <p>{post.likes.length}</p>
        {user.id !== post.userId && (
          <button onClick={likeButton}>{like}</button>
        )}
      </div>
      <h3 className="picture-modal-caption">{post.caption}</h3>
      {post.comments.map((comment) => (
        <>
          <p key={comment.id} className="picture-modal-comment-body"><p className="picture-modal-comment-username">{comment.username}</p> -{comment.body}</p>
          {comment.id !== editComment && comment.userId === user.id && (
            <>
              <a className='picture-modal-edit-comment' onClick={() => setEditComment(comment.id)}>Edit</a>
              <DeleteCommentButton className='picture-modal-delete-comment' bool={false} id={id} postId={post.id} commentId={comment.id} />
            </>
          )}
          {comment.id === editComment && (
            <>
              <input
                type="text"
                value={editVal}
                onChange={(e) => setEditVal(e.target.value)}
              />
              <EditCommentButton
                resetEdit={resetEdit}
                editVal={editVal}
                commentId={comment.id}
                bool={post.userId}
              />
            </>
          )}
        </>
      ))}
      <CommentForm postId={post.id} bool={false} id={id}/>
      {user.id === post.userId && (
        <>
          <EditFormModal post={post} />
          <button onClick={() => del(post)}>Delete</button>
        </>
      )}
    </div>
  );
};

export default Picture;
