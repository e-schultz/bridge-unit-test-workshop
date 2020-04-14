import React from 'react';
import SearchResultListItem from './SearchResultListItem';
export default function SearchResultList({ results, ...props }) {
  return (
    <ul aria-label="results">
      {results.map((result) => {
        return (
          <SearchResultListItem
            key={result.objectID}
            item={result}
            {...props}
          />
        );
      })}
    </ul>
  );
}
