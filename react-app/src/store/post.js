
// types
const GET_FOLLOWERS_POSTS = 'post/GET_FOLLOWERS_POST'



// action creators



const getFollowersPosts = (posts) => ({
    type: GET_FOLLOWERS_POSTS,
    payload: posts
})




// thunks here


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




// reducers
export default function postReducer(state = null, action) {
    switch (action.type) {
        case GET_FOLLOWERS_POSTS:

            const allPosts = {}
            action.payload.posts.forEach(eachPost =>{
                allPosts[eachPost.id] = eachPost
            });

            return { ...state, ...allPosts };
        default:
            return state;
    }
}
