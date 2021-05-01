import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { clearPosts } from "../../store/post";
import { getUsrPosts } from "../../store/post";

function SearchPage() {
  const results = useSelector((store) => store.searchReducer);
  const dispatch = useDispatch();

  const resetPosts = (id) => {
    dispatch(clearPosts());
    dispatch(getUsrPosts(id));
  };

  const newRes = Object.values(results);

  if (!newRes) {
    return <h1> No Results Found </h1>;
  }

  return (
    <div>
      {newRes &&
        newRes.map((result) => (
          <div key={result.id}>
            <NavLink
              to={`/profile/${result.id}`}
              onClick={() => resetPosts(result.id)}
            >
              {" "}
              {result.username}{" "}
            </NavLink>
          </div>
        ))}
    </div>
  );
}

export default SearchPage;
