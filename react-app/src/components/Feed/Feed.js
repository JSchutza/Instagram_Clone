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
            <div className={styles.outerContainer}>
            <div className={styles.imageContainer}>
                    { Object.values(posts).map(post => (
                    <div className={styles.indContainer}>
                            <span className={styles.titleUsername}>{post.username}</span>
                    
                        <img className={styles.image} src={post.url} key={post.id} />
                    
                      <div >
                        {post.likes.length === 1 ? <p> {post.likes.length} like </p> : <p>{post.likes.length} likes </p> }
                    </div>

                    <div>
                                <p className={styles.caption}> <span className={styles.username}> {post.username} </span> {post.caption} </p>
                    </div>

                    <div>
                        {post.comments.map(comment => (
                            <ul>
                                <p key={comment.id}> <span className={styles.bold}>{comment.username}</span>   {comment.body}</p>
                                { comment.userId === user.id ? <DeleteCommentButton postId={post.id} commentId={comment.id}/> : <p></p> }
                                { comment.id !== editComment && comment.userId === user.id && <a onClick={() => setEditComment(comment.id)}>Edit</a> }
                                { comment.id === editComment &&
                                <>
                                 <input type="text" value={editVal} onChange={e => setEditVal(e.target.value)}/>
                                 <EditCommentButton resetEdit={resetEdit} editVal={editVal} commentId={comment.id} bool={false}/>  
                                </>
                                }

                            </ul>
                                )
                        )}

                        <CommentForm postId={post.id}/>
                    </div>
                    </div>
                ))}
             
            </div>
            </div>
        )
    }




}

export default Feed;
