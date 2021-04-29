const ADD_COMMENT = 'comment/ADD_COMMENT';


const addComment = (comment) => ({
    type: ADD_COMMENT,
    payload: comment
});


export const thunk_addComment = ({postId, bodyText}) => async (dispatch) => {
    const response = await fetch(`api/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({postId, 'body': bodyText})
    });

    const data = await response.json();
    if (data.errors) {
        return;
    }
    dispatch(addComment(data))
}


export default function commentReducer(state = {}, action) {
    switch (action.type) {
        case ADD_COMMENT:
         
            return { ...state, ...action.payload };
        default:
            return state;
    }
}