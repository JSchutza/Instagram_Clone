import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./ProfilePage.css";
import PictureModal from "../PictureModal/Picture";
import { Modal } from "../../context/Modal";

function Profile() {
  const [showModal, setShowModal] = useState(-1);
  const posts = useSelector((store) => store.session.user.posts);
  const user = useSelector((store) => store.session.user);

  return (
    <>
      <div className="image-container">
        <h2>{user.username} posts </h2>
        {posts.map((post) => (
          <div className="inner-image-container" key={post.id}>
            <img
              onClick={() => setShowModal(post.id)}
              className="images"
              src={post.url}
            />
            {showModal == post.id && (
              <Modal onClose={() => setShowModal(-1)}>
                <PictureModal post={post} onClose={() => setShowModal(-1)} />
              </Modal>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Profile;
