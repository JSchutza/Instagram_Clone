import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const CreatePost = ({ icon }) => {
  const [captionText, setCaptionText] = useState("");
  const [img, setImg] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const errors = [];
    if (!img) {
      errors.push("You must select a photo to create a post.");
    }

    setErrors(errors);
  }, [img]);


  const onSubmit = async (e) => {
    e.preventDefault()
    fetch('/api/posts', {
      method: 'POST',
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", img);
    formData.append("caption", captionText);
    
    setImageLoading(true);

    const res = await fetch('/api/posts', {
        method: "POST",
        body: formData,
    });
    if (res.ok) {
      await res.json();
      setImageLoading(false);
      // this is where we can flip off the modal
      history.push("/images");
    }
    else {
      setImageLoading(false);
      console.log("error");
    }
    history.push('/profile')
  }

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImg(file);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
      >
        <label>
          Caption
          <input
            type="text"
            name="caption"
            value={captionText}
            onChange={(e) => setCaptionText(e.target.value)}
          />
        </label>

        <label>
          Image
          <input
              type="file"
              accept="image/*"
              onChange={updateImage}
            />
        </label>

        <button
          type="submit"
          styles={{ backgroundImage: `url(${icon})` }}
          disabled={!!errors.length}
        >
          {" "}
          Create Post{" "}
        </button>
        {(imageLoading)&& <p>Loading...</p>}
      </form>
    </>
  );
};

export default CreatePost;
