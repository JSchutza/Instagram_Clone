import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import './ProfilePage.css';
import PictureModal from '../PictureModal/Picture'


function Profile() {  

    const [showModal, setShowModal] = useState(-1);
    const posts = useSelector(store => store.session.user.posts);
    const user = useSelector(store => store.session.user);
  
    return (
        <>  
       
            <div className='image-container'> 
                <h2>{user.username} posts </h2>
                { posts.map(post => (
                    
                    <div className='inner-image-container' key={post.id}>
                    <img onClick={() => setShowModal(post.id)} className='images' src={post.url} />     
                        {showModal == post.id && (<PictureModal post={post} onClose={() => setShowModal(-1)}/>)}
                     
                    </div>
                    
                ))}
            </div>
            
        </>
    )
};

export default Profile;
