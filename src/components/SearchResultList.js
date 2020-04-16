import React from 'react';
// import SearchResultListItem from './SearchResultListItem';
export default function SearchResultList({ results, ...props }) {
  return (
    <ul aria-label="results">
      {results.map((result) => {
        return (
          <li key={result.objectID}>
            <a aria-label={`Read more about ${result.title}`} href={result.url}>
              {result.title}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

/*
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
*/
