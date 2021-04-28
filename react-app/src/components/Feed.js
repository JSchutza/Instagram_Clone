import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFlwrPosts } from "../store/post";
import { thunk_allUsers } from '../store/session';


const Feed = () => {

    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch()
    const posts = useSelector((store) => store.postReducer)
    const normalizedPostData = useSelector((store) => store.allUsersReducer)


    useEffect(() => {
        dispatch(getFlwrPosts())
        setLoaded(true);
    },[])



    if (!loaded || posts === null) {
        return (
            <>
                <h1>Loading...</h1>
            </>
        )
    } else {
        // posts.forEach(post => dispatch(thunk_allUsers(post.userId)))


        return (
            <>
            <div>
                    { Object.values(posts).map(post => (
                    <>
                    <div>
                            {/* Created by: {normalizedPostData[post.userId]} */}
                            {normalizedPostData !== null ? <p>works</p>: <p>broken</p>}
                    </div>
                    <div>
                        <img src={post.url} key={post.id} />
                    </div>

                    <div>
                        <p> {post.caption} </p>
                    </div>

                    <div>
                        {post.comments.map(comment => (
                            <ul>
                                <li key={comment.id}> {comment.body} </li>
                            </ul>
                        ))}
                    </div>

                    <div>
                        {post.likes.length === 1 ? <p> {post.likes.length} like </p> : <p>{post.likes.length} likes </p> }
                    </div>



                    </>
                ))}
            </div>
            </>
        )
    }




}

export default Feed;
