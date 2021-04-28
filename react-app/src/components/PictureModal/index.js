import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import Picture from './Picture.js'
function PictureModal({post}) {

    const [showModal, setShowModal] = useState(-1);

    return (
        <>
          
            {showModal && (
                <Modal onClose={() => setShowModal(-1)}>
                    <Picture post={post}/>
                </Modal>
            )}
        </>
    );
}

export default PictureModal;