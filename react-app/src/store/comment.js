
// types
const GET_USERS_COMMENTS = 'comment/GET_USERS_COMMENTS';



// action creators
const getUsersComments = (comments) => ({
  type: GET_USERS_COMMENTS,
  payload: comments
})


// thunks
export const thunk_getUsersComments = () => async (dispatch) => {
  const response = await fetch('api/users/comments', {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include'
  });

  const data = await response.json();
  if (data.errors) {
    return;
  }
  dispatch(getUsersComments(data))
}




// reducers
export default function commentReducer(state = null, action) {
  switch (action.type){
    case GET_USERS_COMMENTS:
      return { ...state, ...action.payload.comments }
    default:
      return state;
  }
}
