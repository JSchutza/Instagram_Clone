import { useSelector } from "react-redux";
import React from 'react'
import './Picture.css'

const Picture = ({post}) => {
    const user = useSelector(state => state.session.user)

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
                <button>Delete</button>
                </>
            )}
        </div>
    )
}

export default Picture