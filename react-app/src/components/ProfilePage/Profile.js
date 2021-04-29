import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import './ProfilePage.css';

function Profile() {
    const posts = useSelector(store => store.postReducer.usersPosts);
    const user = useSelector(store => store.session.user);

    return (
        <>

            <div className='image-container'>
                <h2>{user.username} posts </h2>
                {Object.values(posts).map(post => (
                    <div className='inner-image-container' key={post.id}>
                    <img className='images' src={post.url} />
                    </div>
                ))}
            </div>
        </>
    )
};

export default Profile;
