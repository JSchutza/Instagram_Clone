
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';




const CreatePost = () => {
  const [ captionText, setCaptionText ] = useState("");
  const [ img, setImg ] = useState("");
  const [ errors, setErrors ] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const errors = [];
    if (!img) {
      errors.push("You must select a photo to create a post.");
    }

    setErrors(errors);
  }, [img]);

  return (
    <>


    <form enctype="multipart/form-data" className='' action='/api/posts' method='POST'>

    <label>
    Caption
    <input
      type='text'
      name='caption'
      value={captionText}
            onChange={(e) => setCaptionText(e.target.value) }
    />
    </label>


    <label>
    Image
    <input
      type='file'
      name='image'
      accept='image/png, image/jpg'
      value={img}
      onChange={(e) => setImg(e.target.value) }
    />
    </label>

    <button type='submit' disabled={!!errors.length}> Create Post </button>

    </form>
    </>
  )
}


export default CreatePost;
