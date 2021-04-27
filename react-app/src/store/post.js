const GET_FOLLOWERS_POSTS = 'post/GET_FOLLOWERS_POST'

const getFollowersPosts = (posts) => ({
    type: GET_FOLLOWERS_POSTS,
    payload: posts
})

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
    switch (action.type) {
        case GET_FOLLOWERS_POSTS:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
