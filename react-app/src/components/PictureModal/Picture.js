import { useSelector, useDispatch } from "react-redux";
import React from 'react'
import './Picture.css'
import { deletePost } from '../../store/post';

const Picture = ({post}) => {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();

    return (
        <div>
            <img className="picture-modal" src={post.url}></img>
            <p>{post.likes.length}</p>
            <h3>{post.caption}</h3>
            { post.comments.map(comment => (
                <p key={comment.id}>{comment.body}</p>
            )) }
            { user.id === post.userId && (
                <>
                <button>Edit</button>
                <button onClick={() => dispatch(deletePost(post.id))}>Delete</button>
                </>
            )}
        </div>
    )
}

export default Picture