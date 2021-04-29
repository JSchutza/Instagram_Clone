
// TYPES
const GET_USERS_LIKES = 'like/GET_USERS_LIKES'




// action creators
const getUsersLikes = (likes) => ({
  type: GET_USERS_LIKES,
  payload: likes
})



// thunks
export const thunk_getUsersLikes = () => async (dispatch) => {
  const response = await fetch('api/users/likes', {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include'
  });

  const data = await response.json();
  if (data.errors) {
    return;
  }
  dispatch(getUsersLikes(data))
}






// reducers
export default function likesReducer(state = null, action) {
  switch (action.type) {
    case GET_USERS_LIKES:
      return { ...state, ...action.payload.likes}
    default:
      return state;
  }
}
