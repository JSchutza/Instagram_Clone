import React, { useState } from "react";
import { useSelector } from "react-redux";

import "./ProfilePage.css";
import PictureModal from "../PictureModal/Picture";
import { Modal } from "../../context/Modal";



function UserProfile() {
  const [showModal, setShowModal] = useState(-1);
  const posts = useSelector((store) => store.postReducer)
  const userPosts = Object.values(posts)
  let user = []
  // userPosts.forEach((post) => { user.push(post.username) })
  for(let i = 0; i < userPosts.length; i++) {
    let post = userPosts[i];
    user.push(post.username)
    if (user.length > 0) break
  }


  return (
    <>
      <div className="image-container">
        <h2>  {user[0]}'s posts </h2>
        {userPosts.map((post) => (
          <div className="inner-image-container" key={post.id}>
            <img
              onClick={() => setShowModal(post.id)}
              className="images"
              src={post.url}
            />
            {showModal === post.id && (
              <Modal  onClose={() => setShowModal(-1)}>
                <PictureModal setShowModal={setShowModal} post={post} onClose={() => setShowModal(-1)} />
              </Modal>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default UserProfile;
