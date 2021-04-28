
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



  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(captionText);
  //   console.log(img);
  //   const response = await fetch('api/posts', {
  //     method: 'POST',
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       "caption": captionText,
  //       "image": img
  //     })
  //   });

  //   const the_data = await response.json();

  //   if (the_data.errors) {
  //     console.log(the_data.errors)
  //   }

  //   if (!the_data.errors) {
  //     history.push('/profile')
  //   }
  // }



// onSubmit={onSubmit}

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
