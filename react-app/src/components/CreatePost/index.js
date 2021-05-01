import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreatePost from "./CreatePost.js";
import {IoAdd} from "react-icons/io5"


function CreatePostModal({ icon }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="create-post-btn" onClick={() => setShowModal(true)}>
        <IoAdd className='import-id'/>
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
