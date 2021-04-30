import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { searchPop } from "../../store/search";

function SearchBar() {
  const [query, setQuery] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  async function search() {
    dispatch(searchPop(query));
    history.push("/search");
  }

  return (
    <>
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        placeholder="Search for users"
      ></input>
      <button onClick={search}>search</button>
    </>
  );
}

export default SearchBar;
