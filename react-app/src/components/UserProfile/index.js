import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./ProfilePage.css";
import PictureModal from "../PictureModal/Picture";
import { Modal } from "../../context/Modal";
import { getUsrPosts } from "../../store/post";
import { clearPosts } from "../../store/post";
import { resetUser } from "../../store/session";

function UserProfile() {
  const [showModal, setShowModal] = useState(-1);
  const [_, setLoaded] = useState(false);
  const [following, setFollowing] = useState("Follow");
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(async () => {
    dispatch(clearPosts());
    await dispatch(getUsrPosts(id));
    setLoaded(true);
  }, []);

  const posts = useSelector((store) => store.postReducer);
  const user = useSelector((store) => store.session.user);

  useEffect(() => {
    if (user.followers && user.followers.includes(Number(id))) {
      setFollowing("Unfollow");
      console.log("here");
    }
  }, [user]);

  async function followButton() {
    await fetch(`/api/users/follow?userId2=${id}`);
    await dispatch(resetUser());
    following == "Unfollow" ? setFollowing("Follow") : setFollowing("Unfollow");
  }

  const userPosts = Object.values(posts);

  return (
    <>
      <div className="image-container">
        {userPosts[0] && <h2>{userPosts[0].username} posts </h2>}
        <button onClick={followButton}>{following}</button>
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

export default UserProfile;
