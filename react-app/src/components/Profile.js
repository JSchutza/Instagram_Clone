import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function Profile() {

    const posts = useSelector(store => store.session.user.posts)
    
    return (
        <>
            <div>
                { posts.map(post => (
                    <img src={post.url} key={post.id}/>
                ))}
            </div>
        </>
    )
}

export default Profile;
