import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./createpost.css";

const CreatePost = ({ setShowModal, icon }) => {
  const [captionText, setCaptionText] = useState("");
  const [img, setImg] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [url, setUrl] = useState("");
  const history = useHistory();

  useEffect(() => {
    const errors = [];
    if (!img) {
      errors.push("You must select a photo to create a post.");
    }

    setErrors(errors);
  }, [img]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", img);
    formData.append("caption", captionText);

    setImageLoading(true);

    const res = await fetch("/api/posts", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      await res.json();
      setImageLoading(false);
      setShowModal(false);
      history.push("/images");
    } else {
      setImageLoading(false);
      console.log("error");
    }
    history.push("/profile");
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImg(file);
    setUrl(URL.createObjectURL(file));
  };

  const change = () => {
    setImg("");
    setUrl("");
  };

  return (
    <>
      <form className="create-post-form" onSubmit={handleSubmit}>
        {!img && (
        <>
          <label className="create-post-label" for='file'>Upload Image</label>
          <input id='file' className="create-post-file-input" type="file" accept="image/*" onChange={updateImage} />
        </>
        )}
        {img && (
          <>
            <img className="create-post-img" alt="upload" src={url}></img>
            {!imageLoading && <button onClick={change} className="create-post-change">
              Change Image
            </button>}
          </>
        )}
        {!imageLoading && <div className="caption-div">
          <label>Caption</label>
          <input
            className="create-post-caption"
            type="text"
            name="caption"
            value={captionText}
            onChange={(e) => setCaptionText(e.target.value)}
          />
          <button
            type="submit"
            styles={{ backgroundImage: `url(${icon})` }}
            disabled={!!errors.length}
          >
            {" "}
            Create Post{" "}
          </button>
        </div>}

        {imageLoading && <p>Loading...</p>}
      </form>
    </>
  );
};

export default CreatePost;
