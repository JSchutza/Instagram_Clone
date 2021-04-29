import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFlwrPosts } from "../../store/post";
import CommentForm from '../CommentForm'
import DeleteCommentButton from '../DeleteCommentButton';
import styles from './Feed.module.css';

const Feed = () => {

    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch()
    const posts = useSelector((store) => store.postReducer)
    const user = useSelector((store) => store.session.user)


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

                    <div className={styles.stuff}>
                        {post.comments.map(comment => (
                            <ul>
                                <li key={comment.id}> {comment.body} </li>
                                { comment.userId === user.id ? <DeleteCommentButton postId={post.id} commentId ={comment.id} /> : <p></p> }
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
