import React, { useState } from 'react';
import styles from './SearchBar.module.css';

function SearchBar({ initialQuery = '', onSearch }) {
  let [query, setQuery] = useState(initialQuery);
  let [showError, setShowError] = useState(false);

  let handleSubmit = (event) => {
    event.preventDefault();
    //onSearch(query);
    if (query.trim().length === 0) {
      setShowError(true);
    } else {
      setShowError(false);
      onSearch(query);
    }
  };
  return (
    <form onSubmit={handleSubmit} data-testid="search-form">
      <div className={styles.searchStyle}>
        <label htmlFor="search-query">Search:</label>
        <input
          id="search-query"
          data-testid="search-query"
          value={query}
          onChange={(evt) => {
            setQuery(evt.target.value);
          }}
        />

        <button type="submit">Search</button>
        {showError ? (
          <div aria-label="Search Field Errors">Please enter a search term</div>
        ) : null}
      </div>
    </form>
  );
}

export default SearchBar;
/*
  {showError ? (
          <div aria-label="Search Field Errors">Please enter a search term</div>
        ) : null}
        */
