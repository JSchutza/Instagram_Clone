import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { editPost } from "../../store/post";
import { useHistory } from "react-router-dom";

const EditForm = ({ post, setShowModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [caption, setCaption] = useState(`${post.caption}`);

  const onSubmit = (e) => {
    e.preventDefault();
    const form = { id: post.id, caption: caption };
    dispatch(editPost(form));
    setShowModal(false);
    history.push("/profile");
  };

  return (
    <div>
      <img alt='post' className="picture-modal" src={post.url}></img>
      <form className="edit-form" onSubmit={onSubmit}>
        <input value={caption} onChange={(e) => setCaption(e.target.value)} />
        <button>Update</button>
      </form>
    </div>
  );
};

export default EditForm;
