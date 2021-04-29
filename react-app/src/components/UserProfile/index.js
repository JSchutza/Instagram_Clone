import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom'
import "./ProfilePage.css";
import PictureModal from "../PictureModal/Picture";
import { Modal } from "../../context/Modal";
import { getUsrPosts } from "../../store/post";


function UserProfile() {
  const [showModal, setShowModal] = useState(-1);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch()
  const id = useParams()
  
  useEffect(() => {
    dispatch(getUsrPosts(id))
    setLoaded(true);
  },[])

  const posts = useSelector((store) => store.postReducer)

  const userPosts = Object.values(posts)

  return (
    <>
      <div className="image-container">
        <h2>{userPosts[0].username} posts </h2>
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
