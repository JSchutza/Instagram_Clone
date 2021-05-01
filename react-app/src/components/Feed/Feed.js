import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFlwrPosts } from "../../store/post";
import CommentForm from "../CommentForm";
import DeleteCommentButton from "../DeleteCommentButton";
import styles from "./Feed.module.css";
import EditCommentButton from "../EditCommentButton";
import LikeButton from "../LikeButton";

const Feed = () => {
  const [loaded, setLoaded] = useState(false);
  const [editComment, setEditComment] = useState(-1);
  const [editVal, setEditVal] = useState("");
  const dispatch = useDispatch();
  const posts = useSelector((store) => store.postReducer);
  const user = useSelector((store) => store.session.user);

  const resetEdit = () => setEditComment(-1);

  useEffect(() => {
    dispatch(getFlwrPosts());
    setLoaded(true);
  }, [dispatch]);

  if (!loaded || posts === null) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  } else {
    return (
      <div className={styles.outerContainer}>
        <div className={styles.imageContainer}>
          {Object.values(posts).map((post) => (
            <div key={post.id} className={styles.indContainer}>
              <span className={styles.titleUsername}>{post.username}</span>

              <img
                alt="post"
                className={styles.image}
                src={post.url}
                key={post.id}
              />

              <LikeButton post={post} user={user} />

              <div>
                {post.likes.length === 1 ? (
                  <p> {post.likes.length} like </p>
                ) : (
                  <p>{post.likes.length} likes </p>
                )}
              </div>

              <div>
                <p className={styles.caption}>
                  {" "}
                  <span className={styles.username}>
                    {" "}
                    {post.username}{" "}
                  </span>{" "}
                  {post.caption}{" "}
                </p>
              </div>

              <div>
                {post.comments.map((comment) => (
                  <ul key={comment.id}>
                    <p>
                      {" "}
                      <span className={styles.bold}>
                        {comment.username}
                      </span>{" "}
                      {comment.body}
                    </p>
                    {comment.userId === user.id ? (
                      <DeleteCommentButton
                        postId={post.id}
                        commentId={comment.id}
                      />
                    ) : (
                      <p></p>
                    )}
                    {comment.id !== editComment &&
                      comment.userId === user.id && (
                        <a onClick={() => setEditComment(comment.id)}>Edit</a>
                      )}
                    {comment.id === editComment && (
                      <>
                        <input
                          type="text"
                          value={editVal}
                          onChange={(e) => setEditVal(e.target.value)}
                        />
                        <EditCommentButton
                          resetEdit={resetEdit}
                          editVal={editVal}
                          commentId={comment.id}
                          bool={false}
                        />
                      </>
                    )}
                  </ul>
                ))}

                <CommentForm postId={post.id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default Feed;
