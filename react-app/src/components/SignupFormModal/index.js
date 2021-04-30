import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SingupForm from './SignupForm.js';

import styles from './signupform.module.css'

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className={styles.signup_btn} onClick={() => setShowModal(true)}>Sign-Up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SingupForm />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
