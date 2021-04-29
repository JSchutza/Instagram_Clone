import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFlwrPosts } from "../store/post";
import CommentForm from '../components/CommentForm'

const Feed = () => {

    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch()
    const posts = useSelector((store) => store.postReducer)

    useEffect(() => {
        dispatch(getFlwrPosts())
        setLoaded(true);
    },[dispatch])




    if (!loaded || posts === null) {
        return (
            <>
                <h1>Loading...</h1>
            </>
        )
    } else {

        return (
            <>
            <div>
                    { Object.values(posts).map(post => (
                    <>
                    <div>
                        {post.username}
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
                    <CommentForm postId={post.id}/>
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
