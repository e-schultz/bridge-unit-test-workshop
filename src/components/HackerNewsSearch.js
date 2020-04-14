import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchResultsList from './SearchResultList';
// replace UL with <SearchResultsList results={results}/>
const API = 'https://hn.algolia.com/api/v1/search?';

/*
<ul aria-label="results">
          {results.map((result) => {
            return (
              <li key={result.objectID}>
                <a
                  aria-label={`Read more about ${result.title}`}
                  href={result.url}
                >
                  {result.title}
                </a>
              </li>
            );
          })}
        </ul>
        */
function HackerNewsSearch({ query }) {
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${API}query=${query}`)
      .then((result) => result.data)
      .then(({ hits }) => {
        setIsLoading(false);
        setResults(hits);
      });
  }, [query]);
  return (
    <section>
      {isLoading ? (
        <div data-testid="loadingPlaceholder">
          ...... please wait while searching for {query}{' '}
        </div>
      ) : (
        <SearchResultsList results={results} />
      )}
    </section>
  );
}

export default HackerNewsSearch;
