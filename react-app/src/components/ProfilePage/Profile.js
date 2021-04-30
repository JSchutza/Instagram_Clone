import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./ProfilePage.css";
import PictureModal from "../PictureModal/Picture";
import { Modal } from "../../context/Modal";
import { getUsrPosts } from "../../store/post";

function Profile() {
  const [showModal, setShowModal] = useState(-1);

  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.session.user);

  useEffect(() => {
    dispatch(getUsrPosts(user.id));
    setLoaded(true);
  }, []);

  const posts = useSelector((store) => store.postReducer);

  const userPosts = Object.values(posts);
  Object.values(posts).forEach((post) => console.log(post.userId));
  console.log(userPosts);
  return (
    <>
      <div className="image-container">
        <h2>{user.username} posts </h2>
        {userPosts.map((post) => (
          <div className="inner-image-container" key={post.id}>
            <img
              onClick={() => setShowModal(post.id)}
              className="images"
              src={post.url}
            />
            {showModal === post.id && (
              <Modal onClose={() => setShowModal(-1)}>
                <PictureModal
                  setShowModal={setShowModal}
                  post={post}
                  onClose={() => setShowModal(-1)}
                />
              </Modal>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Profile;
