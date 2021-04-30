import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditForm from './EditForm.js';

function EditFormModal({post}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='signup-btn' onClick={() => setShowModal(true)}>Edit Caption</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditForm post={post}/>
        </Modal>
      )}
    </>
  );
}

export default EditFormModal;