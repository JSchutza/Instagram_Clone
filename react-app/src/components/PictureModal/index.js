import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import Picture from './Picture.js'
function PictureModal({post}) {

    const [showModal, setShowModal] = useState(true);

    return (
        <>
            <Picture post={post}/>
        </>
    );
}

export default PictureModal;