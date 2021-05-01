import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreatePost from "./CreatePost.js";

function CreatePostModal({ icon }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="create-post-btn" onClick={() => setShowModal(true)}>
        Create Post
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreatePost icon={icon} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default CreatePostModal;
