
// types
const GET_FOLLOWERS_POSTS = 'post/GET_FOLLOWERS_POST'
const GET_POSTS = 'post/GET_POSTS';


// action creators
const getPosts = (posts) => ({
    type: GET_POSTS,
    payload: posts
})


const getFollowersPosts = (posts) => ({
    type: GET_FOLLOWERS_POSTS,
    payload: posts
})




// thunks here
export const thunk_getPosts = () => async (dispatch) => {
    const response = await fetch('api/users/posts', {
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });

    const data = await response.json();
    if (data.errors) {
        return;
    }
    dispatch(getPosts(data))
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



const initialState = { feed: null, usersPosts: null }


// reducers
export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case GET_FOLLOWERS_POSTS:

            const allPosts = {}
            action.payload.posts.forEach(eachPost =>{
                allPosts[eachPost.id] = eachPost
            });

            return { ...state, feed: { ...allPosts } };

        case GET_POSTS:
            return { ...state, usersPosts: { ...action.payload.posts }}


        default:
            return state;
    }
}
