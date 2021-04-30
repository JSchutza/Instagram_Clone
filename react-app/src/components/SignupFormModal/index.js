import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SingupForm from './SignupForm.js';

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='signup-btn' onClick={() => setShowModal(true)}>Sign-Up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SingupForm />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;