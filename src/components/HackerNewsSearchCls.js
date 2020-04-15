import React from 'react';
import axios from 'axios';
const API = 'https://hn.algolia.com/api/v1/search?';

class HackerNewsSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      isLoading: false,
    };
  }
  componentDidMount() {
    this.query();
  }

  query() {
    this.setState({ isLoading: true });
    axios
      .get(`${API}query=${this.props.query}`)
      .then((result) => result.data)
      .then(({ hits }) => {
        this.setState({ results: hits, isLoading: false });
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      this.query();
    }
  }

  render() {
    let { results, isLoading } = this.state;
    let { query } = this.props;
    return (
      <section>
        {isLoading ? (
          <div data-testid="loadingPlaceholder">
            ...... please wait while searching for {query}{' '}
          </div>
        ) : (
          <ul>
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
        )}
      </section>
    );
  }
}

export default HackerNewsSearch;
