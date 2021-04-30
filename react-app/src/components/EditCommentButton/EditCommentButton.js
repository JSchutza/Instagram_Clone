
import React from 'react';
import { useDispatch } from 'react-redux';
import { getFlwrPosts } from '../../store/post';


const EditCommentButton = ({ resetEdit, editVal, commentId }) => {
  const dispatch = useDispatch();

  const clickHandler = async (event) => {
    event.preventDefault();
    const response = await fetch(`/api/posts/comments/${commentId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(editVal)
    });
    resetEdit()
    dispatch(getFlwrPosts())
  }

  return (
    <>
      <a onClick={(event) => clickHandler(event)}>Save</a>
    </>
  )

}

export default EditCommentButton;
