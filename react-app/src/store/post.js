const GET_FOLLOWERS_POSTS = 'post/GET_FOLLOWERS_POST'
const DELETE_POST = 'post/DELETE_POST'

const getFollowersPosts = (posts) => ({
    type: GET_FOLLOWERS_POSTS,
    payload: posts
})

const removePost = (post) => {
    return {
        type: DELETE_POST,
        payload: post
    };
};

export const deletePost = (postId) => async (dispatch) => {
    console.log(postId)
    const response = await fetch(`/api/posts/${postId}`, { 
        method: 'DELETE',
        credentials: 'include'
    })
    const res = await response.json()
    dispatch(removePost(postId))
    return res
}

export const getFlwrPosts = () => async (dispatch) => {
    const response = await fetch('api/posts', {
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });

    const data = await response.json();
    if (data.errors) {
        return;
    }
    dispatch(getFollowersPosts(data))
};

export default function postReducer(state = null, action) {
    let newState;
    switch (action.type) {
        case GET_FOLLOWERS_POSTS:
            
            const allPosts = {}
            action.payload.posts.forEach(eachPost =>{
                allPosts[eachPost.id] = eachPost
            });

            return { ...state, ...allPosts };
        case DELETE_POST:
            newState = Object.assign({}, state);
            console.log(action.payload)
            console.log('newstate:',newState.session)

        default:
            return state;
    }
}
