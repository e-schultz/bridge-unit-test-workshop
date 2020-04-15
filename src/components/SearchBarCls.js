import React from 'react';
import styles from './SearchBar.module.css';
// Refactor the SearchBar component to use Hooks instead
// of being a component that extends from React.Component

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: props.initialQuery,
    };
  }

  setQuery(query) {
    this.setState((state) => ({ query }));
  }
  handleSubmit = (event) => {
    event.preventDefault();

    this.props.onSearch(this.state.query);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className={styles.searchStyle}>
          <label htmlFor="search-query">Search:</label>
          <input
            id="search-query"
            value={this.state.query}
            onChange={(event) => {
              this.setQuery({ query: event.target.value });
              // this.setQuery(event.target.value);
            }}
          />
          <button type="submit">Search</button>
        </div>
      </form>
    );
  }
}

export default SearchBar;
