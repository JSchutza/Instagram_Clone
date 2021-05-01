// constants

const POPULATE_SEARCH = "get/POPULATE_SEARCH";

// action creator

const popSearch = (results) => ({
  type: POPULATE_SEARCH,
  payload: results,
});

//thunks

export const searchPop = (query) => async (dispatch) => {
  const response = await fetch(`/api/search?q=${query}`);
  let result = await response.json();
  if (!result) result = { results: [] };
  dispatch(popSearch(result));
  return result;
};
// reducer

export default function searchReducer(state = {}, action) {
  switch (action.type) {
    case POPULATE_SEARCH:
      if (!action.payload.results) return state;
      return { ...state, ...action.payload.results};

    default:
      return state;
  }
}
