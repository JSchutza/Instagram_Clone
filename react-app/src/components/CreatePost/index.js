import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreatePost from './CreatePost.js';

function CreatePostModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='create-post-btn' onClick={() => setShowModal(true)}>Create Post</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreatePost />
        </Modal>
      )}
    </>
  );
}

export default CreatePostModal;
