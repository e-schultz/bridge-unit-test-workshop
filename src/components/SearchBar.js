import React, { useState } from "react";
import styles from "./SearchBar.module.css";

function SearchBar({ initialQuery, onSearch }) {
  let [query, setQuery] = useState(initialQuery);
  let handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.searchStyle}>
        <label htmlFor="search-query">Search:</label>
        <input
          id="search-query"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
        />
        <button type="submit">Search</button>
      </div>
    </form>
  );
}

export default SearchBar;
