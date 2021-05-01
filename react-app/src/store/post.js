const GET_FOLLOWERS_POSTS = "post/GET_FOLLOWERS_POSTS";
const GET_USER_POSTS = "post/GET_USER_POST";
const DELETE_POST = "post/DELETE_POST";
const CLEAR_POSTS = "post/CLEAR_POSTS";
const EDIT_POST = "post/EDIT_POST";

// action creators
export const clearPosts = () => ({
  type: CLEAR_POSTS,
});

const getFollowersPosts = (posts) => ({
  type: GET_FOLLOWERS_POSTS,
  payload: posts,
});

const getUserPosts = (posts) => ({
  type: GET_USER_POSTS,
  payload: posts,
});

const removePost = (post) => {
  return {
    type: DELETE_POST,
    payload: post,
  };
};

const editPosts = (post) => ({
  type: EDIT_POST,
  payload: post,
});

export const deletePost = (post) => async (dispatch) => {
  await fetch(`/api/posts/${post.id}`, {
    method: "DELETE",
    credentials: "include",
  });

  dispatch(removePost(post));
};

export const getFlwrPosts = () => async (dispatch) => {
  const response = await fetch("/api/posts", {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();
  if (data.errors) {
    return;
  }
  dispatch(getFollowersPosts(data));
};

export const getUsrPosts = (id) => async (dispatch) => {
  const response = await fetch(`/api/posts/user/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();
  if (data.errors) {
    return;
  }
  dispatch(getUserPosts(data));
};

export const editPost = (form) => async (dispatch) => {
  const response = await fetch(`/api/posts/${form.id}`, {
    method: "PUT",
    body: JSON.stringify(form),
  });
  const new_post = await response.json();
  dispatch(editPosts(new_post));
};

export default function postReducer(state = {}, action) {
  switch (action.type) {
    case GET_FOLLOWERS_POSTS:
      const allPosts = {};
      action.payload.posts.forEach((eachPost) => {
        allPosts[eachPost.id] = eachPost;
      });

      return { ...state, ...allPosts };
    case GET_USER_POSTS:
      const userPosts = {};
      action.payload.posts.forEach((eachPost) => {
        userPosts[eachPost.id] = eachPost;
      });

      return { ...state, ...userPosts };

    case CLEAR_POSTS:
      return {};

    case DELETE_POST:
      const pid = action.payload.id;
      delete state[pid];
      return { ...state };

    case EDIT_POST:
      const pid2 = action.payload.id;
      const newS = { ...state };
      newS[pid2] = action.payload;
      return newS;

    default:
      return state;
  }
}
