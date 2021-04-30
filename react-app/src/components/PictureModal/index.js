import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import Picture from "./Picture.js";
function PictureModal({ setShowModal, post }) {
  return (
    <>
      <Picture setShowModal={setShowModal} post={post} />
    </>
  );
}

export default PictureModal;
