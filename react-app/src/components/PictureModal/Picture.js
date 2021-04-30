import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect} from "react";
import "./Picture.css";
import { deletePost, getUsrPosts } from "../../store/post";
import EditFormModal from '../EditModal'

const Picture = ({ setShowModal, post }) => {
  const [like, setLike] = useState('Like')
  const [lid, setLid] = useState('')
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const del = (post) => {
    dispatch(deletePost(post));
    setShowModal(-1)
  };

  useEffect(() => {
    for (like in post.like) {
      if (like.userId === user.Id) {
        setLike('Unlike')
        setLid(like.id)
      }
    }
  },[post])

  async function likeButton() {
    if (like === 'Unlike') {
      await fetch(`/api/posts/${post.id}/likes/${lid}`, {method: 'DELETE'})
      setLike('Like')
    } else {
      const response = await fetch(`/api/posts/${post.id}/likes`, {method: 'POST'})
      const result = await response.json();
      setLid(result.id)
      setLike('Unlike')
    }
    dispatch(getUsrPosts(post.userId))
  }
  


  return (
    <div>
      <img className="picture-modal" src={post.url}></img>
      <p>{post.likes.length}</p>
      {user.id !== post.userId && (
        <button onClick={likeButton}>{like}</button>
      )}
      <h3>{post.caption}</h3>
      {post.comments.map((comment) => (
        <p key={comment.id}>{comment.body}</p>
      ))}
      {user.id === post.userId && (
        <>
          <button>Edit</button>
          <EditFormModal post={post}/>
          <button onClick={() => del(post)}>Delete</button>
        </>
      )}
    </div>
  );
};

export default Picture;
