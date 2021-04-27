import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFlwrPosts } from "../store/post";


const Feed = () => {

    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch()
    const posts = useSelector((store) => store.postReducer)


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
    }

    return (
        <>
        <div>
            { posts.posts.map(post => (
                <img src={post.url} key={post.id} />
            ))}
        </div>
        </>
    )
}

export default Feed;